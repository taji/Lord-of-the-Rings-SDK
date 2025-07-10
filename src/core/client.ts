import { Request } from './types';

export class HttpClient {
  constructor(private baseUrl: string, private apiKey: string) {}

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