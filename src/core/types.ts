export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface Request {
  method: HttpMethod;
  path: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body?: any;
}