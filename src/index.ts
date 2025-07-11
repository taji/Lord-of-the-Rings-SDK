import 'dotenv/config'
import { HttpClient } from './core/client';
import { RequestBuilder } from './core/request-builder';
import { HttpMethod } from './core/types';

import { Movie, MovieResponse } from './types/movie';
import { QuoteResponse } from './types/quote';

/**
 * Fetches a list of movies from The Lord of the Rings API.
 * @param options - Optional parameters for filtering.
 * @param options.filter - A filter string (e.g., 'rottenTomatoesScore>90').
 * @param client - Optional HttpClient instance for dependency injection.
 * @param requestBuilder - Optional RequestBuilder instance for dependency injection.
 * @param envConfig - Optional environment configuration for API key and base URL.
 * @returns A Promise that resolves to a MovieResponse object.
 */
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

/**
 * Fetches a single movie by its ID from The Lord of the Rings API.
 * @param id - The ID of the movie to fetch.
 * @param client - Optional HttpClient instance for dependency injection.
 * @param requestBuilder - Optional RequestBuilder instance for dependency injection.
 * @param envConfig - Optional environment configuration for API key and base URL.
 * @returns A Promise that resolves to a MovieResponse object containing the single movie.
 */
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

/**
 * Fetches a list of quotes from The Lord of the Rings API.
 * @param client - Optional HttpClient instance for dependency injection.
 * @param requestBuilder - Optional RequestBuilder instance for dependency injection.
 * @param envConfig - Optional environment configuration for API key and base URL.
 * @param options - Optional parameters for filtering.
 * @param options.filter - A filter string (e.g., 'dialog=/pattern/').
 * @returns A Promise that resolves to a QuoteResponse object.
 */
export async function fetchQuotes(options?: { filter?: string }, client?: HttpClient, requestBuilder?: RequestBuilder, envConfig?: { apiKey: string; baseUrl: string }): Promise<QuoteResponse> {
    const effectiveApiKey = envConfig?.apiKey || process.env.LOTR_API_KEY;
    const effectiveBaseUrl = envConfig?.baseUrl || process.env.LOTR_API_BASE_URL;

    if (!effectiveApiKey || !effectiveBaseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file or envConfig");
    }

    const httpClient = client || new HttpClient(effectiveBaseUrl, effectiveApiKey);
    const reqBuilder = requestBuilder || new RequestBuilder();

    reqBuilder.setMethod(HttpMethod.GET).setPath('/quote');

    if (options?.filter) {
        reqBuilder.addQueryParam(options.filter, '');
    }

    const request = reqBuilder.build();

    try {
        const data = await httpClient.send<QuoteResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching quotes: ${error}`);
    }
}

/**
 * Fetches a single quote by its ID from The Lord of the Rings API.
 * @param id - The ID of the quote to fetch.
 * @param client - Optional HttpClient instance for dependency injection.
 * @param requestBuilder - Optional RequestBuilder instance for dependency injection.
 * @param envConfig - Optional environment configuration for API key and base URL.
 * @returns A Promise that resolves to a QuoteResponse object containing the single quote.
 */
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

/**
 * Fetches quotes for a specific movie from The Lord of the Rings API.
 * @param movieId - The ID of the movie to fetch quotes for.
 * @param client - Optional HttpClient instance for dependency injection.
 * @param requestBuilder - Optional RequestBuilder instance for dependency injection.
 * @param envConfig - Optional environment configuration for API key and base URL.
 * @returns A Promise that resolves to a QuoteResponse object containing the movie's quotes.
 */
export async function fetchMovieQuotes(movieId: string, client?: HttpClient, requestBuilder?: RequestBuilder, envConfig?: { apiKey: string; baseUrl: string }): Promise<QuoteResponse> {
    const effectiveApiKey = envConfig?.apiKey || process.env.LOTR_API_KEY;
    const effectiveBaseUrl = envConfig?.baseUrl || process.env.LOTR_API_BASE_URL;

    if (!effectiveApiKey || !effectiveBaseUrl) {
        throw new Error("env vars 'LOTR_API_KEY' and 'LOTR_API_BASE_URL' not defined in .env file or envConfig");
    }

    const httpClient = client || new HttpClient(effectiveBaseUrl, effectiveApiKey);
    const reqBuilder = requestBuilder || new RequestBuilder();

    reqBuilder.setMethod(HttpMethod.GET).setPath(`/movie/${movieId}/quote`);

    const request = reqBuilder.build();

    try {
        const data = await httpClient.send<QuoteResponse>(request);
        return data;
    } catch (error) {
        throw new Error(`Error fetching movie quotes: ${error}`);
    }
}