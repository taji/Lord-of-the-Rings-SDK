export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface MovieResponse {
  docs: Movie[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}