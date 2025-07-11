import { fetchQuotes, fetchQuoteById } from '../../src/index';
import { QuoteResponse } from '../../src/types/quote';
import { HttpMethod, Request } from '../../src/core/types';

// Mock the HttpClient module
jest.mock('../../src/core/client', () => {
  const mockSend = jest.fn((request: Request) => {
    // Default mock implementation for HttpClient.send
    if (request.path.includes('/movie')) {
      // This part is for movies, not quotes, but kept for completeness if needed
      return Promise.resolve({}); // Return empty for movie mocks in quote tests
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

describe('Quote Unit Tests', () => {
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

  it('should fetch all quotes using mocks', async () => {
    const quotes: QuoteResponse = await fetchQuotes({}, mockHttpClientInstance, mockRequestBuilderInstance);

    expect(mockHttpClientInstance.send).toHaveBeenCalledTimes(1);
    expect(mockRequestBuilderInstance.setMethod).toHaveBeenCalledWith(HttpMethod.GET);
    expect(mockRequestBuilderInstance.setPath).toHaveBeenCalledWith('/quote');
    expect(quotes).toBeDefined();
    expect(quotes.docs.length).toBeGreaterThan(0);
  });

  it('should fetch filtered quotes using mocks', async () => {
    const filter = 'dialog=/pass/i';
    const filteredQuotes: QuoteResponse = await fetchQuotes({ filter }, mockHttpClientInstance, mockRequestBuilderInstance);

    expect(mockHttpClientInstance.send).toHaveBeenCalledTimes(1);
    expect(mockRequestBuilderInstance.setMethod).toHaveBeenCalledWith(HttpMethod.GET);
    expect(mockRequestBuilderInstance.setPath).toHaveBeenCalledWith('/quote');
    expect(mockRequestBuilderInstance.addQueryParam).toHaveBeenCalledWith(filter, '');
    expect(filteredQuotes).toBeDefined();
    expect(filteredQuotes.docs.length).toBeGreaterThan(0);
  });

  it('should fetch a single quote by ID using mocks', async () => {
    const quoteId = '5cd96e05de30eff6ebcced57';
    const quote: QuoteResponse = await fetchQuoteById(quoteId, mockHttpClientInstance, mockRequestBuilderInstance);

    expect(mockHttpClientInstance.send).toHaveBeenCalledTimes(1);
    expect(mockRequestBuilderInstance.setMethod).toHaveBeenCalledWith(HttpMethod.GET);
    expect(mockRequestBuilderInstance.setPath).toHaveBeenCalledWith(`/quote/${quoteId}`);
    expect(quote).toBeDefined();
    expect(quote.docs.length).toBe(1);
    expect(quote.docs[0]._id).toBe(quoteId);
  });
});