import os

import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
from google import genai
from google.genai import types

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


question = "Methods of AD password verification?"
relevant_chunks = query_documents(question)

print(relevant_chunks)
print("----------------")

answer = generate_response(question, relevant_chunks)

print(answer)
