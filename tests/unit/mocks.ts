import { HttpMethod, Request } from '../src/core/types';

export class MockHttpClient {
  public send = jest.fn((request: Request) => {
    // Default mock implementation
    if (request.path.includes('/movie')) {
      if (request.path.includes('/movie/') && request.path.split('/').length === 3) {
        // Mock for fetchMovieById
        return Promise.resolve({
          docs: [{
            _id: request.path.split('/')[2],
            name: 'Mock Movie',
            runtimeInMinutes: 100,
            budgetInMillions: 100,
            boxOfficeRevenueInMillions: 100,
            academyAwardNominations: 10,
            academyAwardWins: 5,
            rottenTomatoesScore: 90,
          }],
          total: 1,
          limit: 1,
          offset: 0,
          page: 1,
          pages: 1,
        });
      } else {
        // Mock for fetchMovies
        return Promise.resolve({
          docs: [
            {
              _id: 'mockMovie1',
              name: 'Mock Movie 1',
              runtimeInMinutes: 100,
              budgetInMillions: 100,
              boxOfficeRevenueInMillions: 100,
              academyAwardNominations: 10,
              academyAwardWins: 5,
              rottenTomatoesScore: 90,
            },
            {
              _id: 'mockMovie2',
              name: 'Mock Movie 2',
              runtimeInMinutes: 120,
              budgetInMillions: 120,
              boxOfficeRevenueInMillions: 120,
              academyAwardNominations: 12,
              academyAwardWins: 6,
              rottenTomatoesScore: 95,
            },
          ],
          total: 2,
          limit: 2,
          offset: 0,
          page: 1,
          pages: 1,
        });
      }
    } else if (request.path.includes('/quote')) {
      if (request.path.includes('/quote/') && request.path.split('/').length === 3) {
        // Mock for fetchQuoteById
        return Promise.resolve({
          docs: [{
            _id: request.path.split('/')[2],
            dialog: 'Mock Quote',
            movie: 'mockMovieId',
            character: 'mockCharacter',
            id: request.path.split('/')[2],
          }],
          total: 1,
          limit: 1,
          offset: 0,
          page: 1,
          pages: 1,
        });
      } else {
        // Mock for fetchQuotes
        return Promise.resolve({
          docs: [
            {
              _id: 'mockQuote1',
              dialog: 'Mock Quote 1',
              movie: 'mockMovieId1',
              character: 'mockCharacter1',
              id: 'mockQuote1',
            },
            {
              _id: 'mockQuote2',
              dialog: 'Mock Quote 2',
              movie: 'mockMovieId2',
              character: 'mockCharacter2',
              id: 'mockQuote2',
            },
          ],
          total: 2,
          limit: 2,
          offset: 0,
          page: 1,
          pages: 1,
        });
      }
    }
    return Promise.resolve({});
  });
}

export class MockRequestBuilder {
  private request: Request;

  constructor() {
    this.request = {
      method: HttpMethod.GET,
      path: '',
      headers: {},
      queryParams: {},
    };
  }

  public setMethod = jest.fn((method: HttpMethod) => {
    this.request.method = method;
    return this;
  });

  public setPath = jest.fn((path: string) => {
    this.request.path = path;
    return this;
  });

  public addQueryParam = jest.fn((key: string, value: string) => {
    this.request.queryParams[key] = value;
    return this;
  });

  public build = jest.fn(() => {
    return this.request;
  });
}