import 'dotenv/config'
import { HttpClient } from './http/client';
import { RequestBuilder } from './http/request-builder';
import { HttpMethod } from './http/types';

export async function fetchMovies(options?: { filter?: string }) {
    const apiKey = process.env.LOTR_API_KEY;
    const baseUrl = process.env.LOTR_API_BASE_URL;

    if (!apiKey || !baseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file");
    }

    const client = new HttpClient(baseUrl, apiKey);
    const requestBuilder = new RequestBuilder()
        .setMethod(HttpMethod.GET)
        .setPath('/movie');

    if (options?.filter) {
        requestBuilder.addQueryParam(options.filter, '');
    }

    const request = requestBuilder.build();

    try {
        const data = await client.send(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching movies: ${error}`);
    }
}