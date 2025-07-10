import 'dotenv/config'
import { HttpClient } from './http/client';
import { RequestBuilder } from './http/request-builder';
import { HttpMethod } from './http/types';

import { Movie, MovieResponse } from './types/movie';
import { QuoteResponse } from './types/quote';

export async function fetchMovies(options?: { filter?: string }): Promise<MovieResponse> {
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
        const data = await client.send<MovieResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching movies: ${error}`);
    }
}

export async function fetchMovieById(id: string) : Promise<MovieResponse> {
    const apiKey = process.env.LOTR_API_KEY;
    const baseUrl = process.env.LOTR_API_BASE_URL;

    if (!apiKey || !baseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defind");       
    }

    console.log('id', id)

    const client = new HttpClient(baseUrl, apiKey);
    const requestBuilder = new RequestBuilder()
        .setMethod(HttpMethod.GET)
        .setPath(`/movie/${id}`);
    
    const request = requestBuilder.build();

    try {
        const data = await client.send<MovieResponse>(request);
        return data;

    } catch (error) {
        throw new Error(`Error fetching movie:  ${error}`);
    }
}

export async function fetchQuotes(): Promise<QuoteResponse> {
    const apiKey = process.env.LOTR_API_KEY;
    const baseUrl = process.env.LOTR_API_BASE_URL;

    if (!apiKey || !baseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file");
    }

    const client = new HttpClient(baseUrl, apiKey);
    const requestBuilder = new RequestBuilder()
        .setMethod(HttpMethod.GET)
        .setPath('/quote');

    const request = requestBuilder.build();

    try {
        const data = await client.send<QuoteResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching quotes: ${error}`);
    }
}

export async function fetchQuoteById(id: string): Promise<QuoteResponse> {
    const apiKey = process.env.LOTR_API_KEY;
    const baseUrl = process.env.LOTR_API_BASE_URL;

    if (!apiKey || !baseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file");
    }

    const client = new HttpClient(baseUrl, apiKey);
    const requestBuilder = new RequestBuilder()
        .setMethod(HttpMethod.GET)
        .setPath(`/quote/${id}`);

    const request = requestBuilder.build();

    try {
        const data = await client.send<QuoteResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching quote: ${error}`);
    }
}