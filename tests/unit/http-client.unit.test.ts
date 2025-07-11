import { HttpClient } from '../../src/core/client';
import { RequestBuilder } from '../../src/core/request-builder';
import { HttpMethod } from '../../src/core/types';

describe('HttpClient Unit Tests', () => {
  let httpClient: HttpClient;
  const baseUrl = 'http://mockapi.com';
  const apiKey = 'mock-api-key';

  // Mock the global fetch function
  const mockFetch = jest.fn();
  beforeAll(() => {
    global.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockClear(); // Clear mock calls before each test
    httpClient = new HttpClient(baseUrl, apiKey);
  });

  it('should send a GET request and return JSON data', async () => {
    const mockResponseData = { message: 'Success' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
      status: 200,
      headers: new Headers(),
    });

    const request = new RequestBuilder()
      .setMethod(HttpMethod.GET)
      .setPath('/data')
      .build();

    const result = await httpClient.send(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/data`, {
      method: 'GET',
      headers: expect.any(Object),
      body: undefined,
    });
    expect(result).toEqual(mockResponseData);
  });

  it('should handle non-OK responses and throw an error', async () => {
    const mockErrorStatus = 404;
    const mockErrorText = 'Not Found';
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: mockErrorStatus,
      statusText: mockErrorText,
      json: () => Promise.resolve({}), // Even for errors, json() might be called
      headers: new Headers(),
    });

    const request = new RequestBuilder()
      .setMethod(HttpMethod.GET)
      .setPath('/non-existent')
      .build();

    await expect(httpClient.send(request)).rejects.toThrow(
      `HTTP Error! Status: ${mockErrorStatus} Message: ${mockErrorText}`,
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should include query parameters in the URL', async () => {
    const mockResponseData = { items: [] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
      status: 200,
      headers: new Headers(),
    });

    const request = new RequestBuilder()
      .setMethod(HttpMethod.GET)
      .setPath('/search')
      .addQueryParam('q', 'test')
      .addQueryParam('limit', '10')
      .build();

    await httpClient.send(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/search?q=test&limit=10`, expect.any(Object));
  });

  it('should send a POST request with a body', async () => {
    const mockResponseData = { id: 'new-item' };
    const requestBody = { name: 'New Item' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
      status: 201,
      headers: new Headers(),
    });

    const request = new RequestBuilder()
      .setMethod(HttpMethod.POST)
      .setPath('/items')
      .setRequestBody(requestBody)
      .build();

    await httpClient.send(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/items`, {
      method: 'POST',
      headers: expect.any(Object),
      body: JSON.stringify(requestBody),
    });
  });

  it('should send a GET request without query parameters', async () => {
    const mockResponseData = { message: 'No params' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
      status: 200,
      headers: new Headers(),
    });

    const request = new RequestBuilder()
      .setMethod(HttpMethod.GET)
      .setPath('/no-params')
      .build();

    const result = await httpClient.send(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/no-params`, expect.any(Object));
    expect(result).toEqual(mockResponseData);
  });
});