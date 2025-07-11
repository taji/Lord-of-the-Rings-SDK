import { RequestBuilder } from '../../src/core/request-builder';
import { HttpMethod, Request } from '../../src/core/types';

describe('RequestBuilder Unit Tests', () => {
  let requestBuilder: RequestBuilder;

  beforeEach(() => {
    requestBuilder = new RequestBuilder();
  });

  it('should set the HTTP method', () => {
    requestBuilder.setMethod(HttpMethod.POST);
    const request = requestBuilder.build();
    expect(request.method).toBe(HttpMethod.POST);
  });

  it('should set the path', () => {
    requestBuilder.setPath('/test-path');
    const request = requestBuilder.build();
    expect(request.path).toBe('/test-path');
  });

  it('should add query parameters', () => {
    requestBuilder.addQueryParam('param1', 'value1');
    requestBuilder.addQueryParam('param2', 'value2');
    const request = requestBuilder.build();
    expect(request.queryParams).toEqual({
      param1: 'value1',
      param2: 'value2',
    });
  });

  it('should return the correct request object', () => {
    requestBuilder.setMethod(HttpMethod.GET);
    requestBuilder.setPath('/users');
    requestBuilder.addQueryParam('id', '123');

    const request = requestBuilder.build();

    expect(request).toEqual({
      method: HttpMethod.GET,
      path: '/users',
      headers: {},
      queryParams: {
        id: '123',
      },
    });
  });

  it('should allow method chaining', () => {
    const request = requestBuilder
      .setMethod(HttpMethod.PUT)
      .setPath('/items/456')
      .addQueryParam('status', 'active')
      .build();

    expect(request.method).toBe(HttpMethod.PUT);
    expect(request.path).toBe('/items/456');
    expect(request.queryParams).toEqual({
      status: 'active',
    });
  });

  it('should set the request body', () => {
    const requestBody = { data: 'test' };
    requestBuilder.setRequestBody(requestBody);
    const request = requestBuilder.build();
    expect(request.body).toEqual(requestBody);
  });
});