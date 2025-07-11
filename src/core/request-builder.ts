import { HttpMethod, Request } from './types';

export class RequestBuilder {
  private request: Request;

  constructor() {
    this.request = {
      method: HttpMethod.GET,
      path: '',
      headers: {},
      queryParams: {},
    };
  }

  public setMethod(method: HttpMethod): RequestBuilder {
    this.request.method = method;
    return this;
  }

  public setPath(path: string): RequestBuilder {
    this.request.path = path;
    return this;
  }

  public addQueryParam(key: string, value: string): RequestBuilder {
    this.request.queryParams[key] = value;
    return this;
  }

  public setRequestBody(body: any): RequestBuilder {
    this.request.body = body;
    return this;
  }

  public build(): Request {
    return this.request;
  }
}