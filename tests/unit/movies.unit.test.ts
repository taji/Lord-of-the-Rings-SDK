import { fetchMovies, fetchMovieById } from '../../src/index';
import { MovieResponse } from '../../src/types/movie';
import { HttpMethod, Request } from '../../src/core/types';

// Mock the HttpClient module
jest.mock('../../src/core/client', () => {
  const mockSend = jest.fn((request: Request) => {
    // Default mock implementation for HttpClient.send
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

  return {
    HttpClient: jest.fn().mockImplementation(() => {
      return {
        send: mockSend,
      };
    }),
  };
});

// Mock the RequestBuilder module
jest.mock('../../src/core/request-builder', () => {
  const { HttpMethod } = jest.requireActual('../../src/core/types');
  const mockRequest: Request = {
    method: HttpMethod.GET,
    path: '',
    headers: {},
    queryParams: {},
  };
  const mockSetMethod = jest.fn((method: HttpMethod) => {
    mockRequest.method = method;
    return mockRequestBuilderInstance;
  });
  const mockSetPath = jest.fn((path: string) => {
    mockRequest.path = path;
    return mockRequestBuilderInstance;
  });
  const mockAddQueryParam = jest.fn((key: string, value: string) => {
    mockRequest.queryParams[key] = value;
    return mockRequestBuilderInstance;
  });
  const mockBuild = jest.fn(() => {
    return mockRequest;
  });

  const mockRequestBuilderInstance = {
    setMethod: mockSetMethod,
    setPath: mockSetPath,
    addQueryParam: mockAddQueryParam,
    build: mockBuild,
  };

  return {
    RequestBuilder: jest.fn().mockImplementation(() => {
      return mockRequestBuilderInstance;
    }),
  };
});

describe('Movie Unit Tests', () => {
  let mockHttpClientInstance: any; // Use any for mocked instances
  let mockRequestBuilderInstance: any; // Use any for mocked instances

  beforeEach(() => {
    jest.clearAllMocks();
    // Get the mock instances from the mocked modules
    const { HttpClient } = require('../../src/core/client');
    const { RequestBuilder } = require('../../src/core/request-builder');
    mockHttpClientInstance = new HttpClient();
    mockRequestBuilderInstance = new RequestBuilder();
  });

  it('should fetch all movies using mocks', async () => {
    const movies: MovieResponse = await fetchMovies({}, mockHttpClientInstance, mockRequestBuilderInstance);

    expect(mockHttpClientInstance.send).toHaveBeenCalledTimes(1);
    expect(mockRequestBuilderInstance.setMethod).toHaveBeenCalledWith(HttpMethod.GET);
    expect(mockRequestBuilderInstance.setPath).toHaveBeenCalledWith('/movie');
    expect(movies).toBeDefined();
    expect(movies.docs.length).toBeGreaterThan(0);
  });

  it('should fetch a single movie by ID using mocks', async () => {
    const movieId = '5cd95395de30eff6ebccde56';
    const movie: MovieResponse = await fetchMovieById(movieId, mockHttpClientInstance, mockRequestBuilderInstance);

    expect(mockHttpClientInstance.send).toHaveBeenCalledTimes(1);
    expect(mockRequestBuilderInstance.setMethod).toHaveBeenCalledWith(HttpMethod.GET);
    expect(mockRequestBuilderInstance.setPath).toHaveBeenCalledWith(`/movie/${movieId}`);
    expect(movie).toBeDefined();
    expect(movie.docs.length).toBe(1);
    expect(movie.docs[0]._id).toBe(movieId);
  });

  it('should fetch movies with a filter using mocks', async () => {
    const filter = 'rottenTomatoesScore>90';
    const filteredMovies: MovieResponse = await fetchMovies({ filter }, mockHttpClientInstance, mockRequestBuilderInstance);

    expect(mockHttpClientInstance.send).toHaveBeenCalledTimes(1);
    expect(mockRequestBuilderInstance.setMethod).toHaveBeenCalledWith(HttpMethod.GET);
    expect(mockRequestBuilderInstance.setPath).toHaveBeenCalledWith('/movie');
    expect(mockRequestBuilderInstance.addQueryParam).toHaveBeenCalledWith(filter, '');
    expect(filteredMovies).toBeDefined();
    expect(filteredMovies.docs.length).toBeGreaterThan(0);
  });
});