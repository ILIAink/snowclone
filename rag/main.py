import os

import chromadb
import matplotlib.pyplot as plt
import numpy as np
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
from google import genai
from google.genai import types
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

# Automatically loads in .env values
load_dotenv()


gemini_key = os.getenv("GEMINI_API_KEY")

# Gemini Embedding Function
# Fixed logic bug: pass the fetched string value to 'api_key' instead of 'api_key_env_var'
gemini_ef = embedding_functions.GoogleGenaiEmbeddingFunction(
    model_name="gemini-embedding-001"
)

# Create collection
chroma_client = chromadb.PersistentClient(path="chroma_persistent_storage")
collection_name = "document_it_collection"
collection = chroma_client.get_or_create_collection(
    name=collection_name,
    embedding_function=gemini_ef,  # type: ignore
)


client = genai.Client(api_key=gemini_key)


# Load documents from dict
def load_documents_from_directory(directory_path):
    print("==== Loading documents from directory ====")
    documents = []
    for filename in os.listdir(directory_path):
        if filename.endswith(".md"):
            with open(
                os.path.join(directory_path, filename), "r", encoding="utf-8"
            ) as file:
                documents.append({"id": filename, "text": file.read()})
    return documents


# Function to split text into chunks
def split_text(text, chunk_size=1000, chunk_overlap=20):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - chunk_overlap
    return chunks


directory_path = "./Documents"
documents = load_documents_from_directory(directory_path)

print(f"Loaded {len(documents)} documents")

chunked_documents = []
print("==== Splitting docs into chunks ====")
for doc in documents:
    chunks = split_text(doc["text"])
    for i, chunk in enumerate(chunks):
        chunked_documents.append(
            {"id": f"{doc['id']}_chunk{i + 1}", "text": chunk}
        )

print(f"Split documents into {len(chunked_documents)} chunks")


def generate_embeddings(text):
    response = client.models.embed_content(
        contents=text,
        model="gemini-embedding-001",
    )
    print("==== Generatig Embeddings ====")
    return response.embeddings[0].values  # type: ignore


for doc in chunked_documents:
    print("==== Adding generated embeddings to doc property... ====")
    doc["embedding"] = generate_embeddings(doc["text"])

for doc in chunked_documents:
    print("==== Inserting Embeddings into DB ====")
    collection.upsert(
        ids=[doc["id"]], documents=[doc["text"]], embeddings=[doc["embedding"]]
    )


# n-results, number of neighbors to return per query
def query_documents(question, n_results=2):
    # query_embedding = get_openai_embedding(question)
    results = collection.query(query_texts=question, n_results=n_results)

    # Extract the relevant chunks
    relevant_chunks = [
        doc
        for sublist in results["documents"]  # type: ignore
        for doc in sublist
    ]
    print("==== Returning relevant chunks ====")
    return relevant_chunks


def generate_response(question, relevant_chunks):
    context = "\n\n".join(relevant_chunks)

    # Define the system instruction or prompt context
    prompt = (
        "You are an assistant for question-answering tasks. Use the following pieces of "
        "retrieved context to answer the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the answer concise."
        "\n\nContext:\n" + context + "\n\nQuestion:\n" + question
    )

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=question,
        config=types.GenerateContentConfig(
            system_instruction=prompt,
            temperature=0.2,  # Lower temperature helps stay factual to context
        ),
    )

    return response.text


def plot_embeddings(question):
    print("==== Getting document embeddings ====")

    # Get all stored embeddings from Chroma
    data = collection.get(include=["embeddings", "documents"])

    document_embeddings = data["embeddings"]
    documents = data["documents"]
    ids = data["ids"]

    if document_embeddings is None or len(document_embeddings) == 0:
        print("No embeddings found.")
        return

    # 1. Identify which IDs the vector database actually retrieves for this question
    print("==== Identifying retrieved chunks ====")
    query_results = collection.query(query_texts=[question], n_results=2)

    retrieved_ids = query_results["ids"][0]

    # Generate embedding for the question
    print("==== Generating question embedding ====")
    question_embedding = generate_embeddings(question)

    # Combine document vectors + question vector
    all_embeddings = list(document_embeddings) + [question_embedding]
    all_embeddings_array = np.array(all_embeddings)

    # 2. Update t-SNE to 3 components (3D)
    n_samples = len(all_embeddings_array)
    perplexity_val = min(30, n_samples - 1) if n_samples > 1 else 1

    # Notice n_components=3 here!
    tsne = TSNE(
        n_components=3,
        perplexity=perplexity_val,
        random_state=42,
        init="random",
    )
    reduced_embeddings = tsne.fit_transform(all_embeddings_array)

    document_points = reduced_embeddings[:-1]
    question_point = reduced_embeddings[-1]

    # Plot setup for 3D
    fig = plt.figure(figsize=(14, 10))
    ax = fig.add_subplot(111, projection="3d")

    # Plot all document vectors (X, Y, Z)
    ax.scatter(
        document_points[:, 0],
        document_points[:, 1],
        document_points[:, 2],
        alpha=0.6,
        label="Document chunks",
        s=50,
    )

    # Plot question vector
    ax.scatter(
        question_point[0],
        question_point[1],
        question_point[2],
        s=300,
        marker="*",
        color="darkorange",
        label="Question",
    )

    # Annotate ALL document IDs and circle the RETRIEVED ones
    for i, doc_id in enumerate(ids):
        # Add the ID as text next to the point
        ax.text(
            document_points[i, 0] + 0.5,
            document_points[i, 1] + 0.5,
            document_points[i, 2] + 0.5,
            doc_id,
            fontsize=8,
            alpha=0.8,
        )

        # If this ID is in our retrieved results, draw a red circle around it
        if doc_id in retrieved_ids:
            ax.scatter(
                document_points[i, 0],
                document_points[i, 1],
                document_points[i, 2],
                s=600,
                facecolors="none",
                edgecolors="red",
                linewidths=2,
                label="Retrieved Chunk" if doc_id == retrieved_ids[0] else "",
            )

    # Label the question
    ax.text(
        question_point[0] + 1,
        question_point[1] + 1,
        question_point[2] + 1,
        question,
        fontsize=10,
        fontweight="bold",
    )

    ax.set_title("Document Embeddings + Query (3D t-SNE Projection)")
    ax.set_xlabel("t-SNE Dimension 1")
    ax.set_ylabel("t-SNE Dimension 2")
    ax.set_zlabel("t-SNE Dimension 3")
    ax.legend()

    # Matplotlib's show() will open an interactive window where you can click and drag to rotate!
    plt.show()


question = "Methods of AD password verification?"
relevant_chunks = query_documents(question)

print(relevant_chunks)
print("----------------")

answer = generate_response(question, relevant_chunks)

print(answer)

plot_embeddings(question)

# Create the chat session with the model and system instruction configuration
# chat = client.chats.create(
#     model="gemini-3.6-flash",
#     config=types.GenerateContentConfig(
#         system_instruction="You are a helpful IT support assistant expert in troubleshooting corporate systems."
#     ),
# )

# response = chat.send_message("How do I clear the print spooler on Windows?")
# print(response.text)

# if __name__ == "__main__":
#     docs = load_documents_from_directory("./Documents")
#     doc = docs[0]["text"]

#     chunks = split_text(doc)
#     print(chunks)

#     Load documents from dir
