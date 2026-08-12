import { loadDocuments, createChunks } from "./services/rag.ts";
import type { Document } from "./types/rag.ts";
console.log("rag.ts loaded");
console.log({ loadDocuments, createChunks });

let docs = await loadDocuments("./data/Documents");
let doc: Document = docs[0];

let chunkedDocs = createChunks(doc);
console.log(chunkedDocs);
