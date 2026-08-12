import { basename, join } from "node:path";
import { ChunkedDocument, Document } from "../types/rag";
import { open, readdir, readFile } from "node:fs/promises";

export const loadDocuments = async (path: string): Promise<Document[]> => {
  let documents: Document[] = [];
  try {
    const files = await readdir(path, { withFileTypes: true });
    for (const file of files) {
      const path = join(file.parentPath, file.name);
      const id = basename(path, ".md");
      const text = await readFile(path, "utf-8");
      const numberOfLines = text.length === 0 ? 0 : text.split("\n").length;
      documents.push({ id, path, text, numberOfLines });
    }
  } catch (err) {
    console.error(err);
  }
  return documents;
};

export const createChunks = (
  document: Document,
  chunkSize = 1000,
  chunkOverlap = 20,
): ChunkedDocument[] => {
  let start = 0;
  let chunkedDocuments: ChunkedDocument[] = [];
  let chunkCount = 1;

  while (start < document.text.length) {
    const end = start + chunkSize;
    const chunkText = document.text.slice(start, end);

    const startLine = document.text.slice(0, start).split("\n").length;
    const endLine = startLine + chunkText.split("\n").length - 1;

    chunkedDocuments.push({
      id: `${document.id}_${chunkCount}`,
      path: document.path,
      text: chunkText,
      numberOfLines: chunkText.split(/\r?\n/).length,
      chunk: chunkCount,
      startLine,
      endLine,
    });

    start = end - chunkOverlap;
    console.log(start, document.text.length);

    chunkCount++;
  }

  return chunkedDocuments;
};

const generateEmbedding = () => {};

const queryDocuments = () => {};

const generateResponse = () => {};
