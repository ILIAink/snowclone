export type Document = {
  id: string;
  path: string;
  text: string;
  numberOfLines: number;
};

export interface ChunkedDocument extends Document {
  chunk: number;
  startLine: number;
  endLine: number;
}
