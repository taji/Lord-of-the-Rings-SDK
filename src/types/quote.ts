export interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
}

export interface QuoteResponse {
  docs: Quote[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}