import { HttpMethod, Request } from './types';

/**
 * A builder class for constructing HTTP requests.
 * Provides a fluent interface for setting request properties.
 */
export class RequestBuilder {
  private request: Request;

  /**
   * Creates an instance of RequestBuilder.
   */
  constructor() {
    this.request = {
      method: HttpMethod.GET,
      path: '',
      headers: {},
      queryParams: {},
    };
  }

  /**
   * Sets the HTTP method for the request.
   * @param method - The HTTP method (e.g., GET, POST, PUT).
   * @returns The RequestBuilder instance for chaining.
   */
  public setMethod(method: HttpMethod): RequestBuilder {
    this.request.method = method;
    return this;
  }

  /**
   * Sets the path for the request.
   * @param path - The URL path (e.g., '/movies', '/quotes/123').
   * @returns The RequestBuilder instance for chaining.
   */
  public setPath(path: string): RequestBuilder {
    this.request.path = path;
    return this;
  }

  /**
   * Adds a query parameter to the request.
   * @param key - The name of the query parameter.
   * @param value - The value of the query parameter.
   * @returns The RequestBuilder instance for chaining.
   */
  public addQueryParam(key: string, value: string): RequestBuilder {
    this.request.queryParams[key] = value;
    return this;
  }

  /**
   * Sets the request body.
   * @param body - The body of the request.
   * @returns The RequestBuilder instance for chaining.
   */
  public setRequestBody(body: any): RequestBuilder {
    this.request.body = body;
    return this;
  }

  /**
   * Builds the final Request object.
   * @returns The constructed Request object.
   */
  public build(): Request {
    return this.request;
  }
}