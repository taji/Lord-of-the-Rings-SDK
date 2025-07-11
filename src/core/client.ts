import { Request } from './types';

/**
 * A simple HTTP client for making API requests.
 * Handles base URL, API key, and request execution.
 */
export class HttpClient {
  /**
   * Creates an instance of HttpClient.
   * @param baseUrl - The base URL for the API requests.
   * @param apiKey - The API key for authorization.
   */
  constructor(private baseUrl: string, private apiKey: string) {}

  /**
   * Sends an HTTP request.
   * @param request - The request object built by RequestBuilder.
   * @returns A Promise that resolves to the response data of type T.
   * @throws An Error if the HTTP response is not OK.
   */
  async send<T>(request: Request): Promise<T> {
    let url = `${this.baseUrl}${request.path}`;

    if (request.queryParams) {
      const queryString = Object.entries(request.queryParams)
        .map(([key, value]) => value ? `${key}=${value}` : key)
        .join('&');
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        },
      body: request.body ? JSON.stringify(request.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} Message: ${response.statusText}`);
    }

    return response.json();
  }
}