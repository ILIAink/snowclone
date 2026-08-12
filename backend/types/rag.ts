export type Document = {
  id: string;
  text: string;
  numberOfLines: number;
};

export interface ChunkedDocument extends Document {
  startLine: number;
  endLine: number;
}
