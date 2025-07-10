import 'dotenv/config'
import { HttpClient } from './core/client';
import { RequestBuilder } from './core/request-builder';
import { HttpMethod } from './core/types';

import { Movie, MovieResponse } from './types/movie';
import { QuoteResponse } from './types/quote';

export async function fetchMovies(options?: { filter?: string }, client?: HttpClient, requestBuilder?: RequestBuilder, envConfig?: { apiKey: string; baseUrl: string }): Promise<MovieResponse> {
    const effectiveApiKey = envConfig?.apiKey || process.env.LOTR_API_KEY;
    const effectiveBaseUrl = envConfig?.baseUrl || process.env.LOTR_API_BASE_URL;

    if (!effectiveApiKey || !effectiveBaseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file or envConfig");
    }

    const httpClient = client || new HttpClient(effectiveBaseUrl, effectiveApiKey);
    const reqBuilder = requestBuilder || new RequestBuilder();

    reqBuilder.setMethod(HttpMethod.GET).setPath('/movie');

    if (options?.filter) {
        reqBuilder.addQueryParam(options.filter, '');
    }

    const request = reqBuilder.build();

    try {
        const data = await httpClient.send<MovieResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching movies: ${error}`);
    }
}

export async function fetchMovieById(id: string, client?: HttpClient, requestBuilder?: RequestBuilder, envConfig?: { apiKey: string; baseUrl: string }) : Promise<MovieResponse> {
    const effectiveApiKey = envConfig?.apiKey || process.env.LOTR_API_KEY;
    const effectiveBaseUrl = envConfig?.baseUrl || process.env.LOTR_API_BASE_URL;

    if (!effectiveApiKey || !effectiveBaseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file or envConfig");       
    }

    const httpClient = client || new HttpClient(effectiveBaseUrl, effectiveApiKey);
    const reqBuilder = requestBuilder || new RequestBuilder();

    reqBuilder.setMethod(HttpMethod.GET).setPath(`/movie/${id}`);
    
    const request = reqBuilder.build();

    try {
        const data = await httpClient.send<MovieResponse>(request);
        return data;

    } catch (error) {
        throw new Error(`Error fetching movie: ${error}`);
    }
}

export async function fetchQuotes(client?: HttpClient, requestBuilder?: RequestBuilder, envConfig?: { apiKey: string; baseUrl: string }): Promise<QuoteResponse> {
    const effectiveApiKey = envConfig?.apiKey || process.env.LOTR_API_KEY;
    const effectiveBaseUrl = envConfig?.baseUrl || process.env.LOTR_API_BASE_URL;

    if (!effectiveApiKey || !effectiveBaseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file or envConfig");
    }

    const httpClient = client || new HttpClient(effectiveBaseUrl, effectiveApiKey);
    const reqBuilder = requestBuilder || new RequestBuilder();

    reqBuilder.setMethod(HttpMethod.GET).setPath('/quote');

    const request = reqBuilder.build();

    try {
        const data = await httpClient.send<QuoteResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching quotes: ${error}`);
    }
}

export async function fetchQuoteById(id: string, client?: HttpClient, requestBuilder?: RequestBuilder, envConfig?: { apiKey: string; baseUrl: string }): Promise<QuoteResponse> {
    const effectiveApiKey = envConfig?.apiKey || process.env.LOTR_API_KEY;
    const effectiveBaseUrl = envConfig?.baseUrl || process.env.LOTR_API_BASE_URL;

    if (!effectiveApiKey || !effectiveBaseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file or envConfig");
    }

    const httpClient = client || new HttpClient(effectiveBaseUrl, effectiveApiKey);
    const reqBuilder = requestBuilder || new RequestBuilder();

    reqBuilder.setMethod(HttpMethod.GET).setPath(`/quote/${id}`);

    const request = reqBuilder.build();

    try {
        const data = await httpClient.send<QuoteResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching quote: ${error}`);
    }
}