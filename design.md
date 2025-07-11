# SDK Design Details

This document outlines the design principles and architectural choices made during the development of this Lord of the Rings SDK.

## 1. Core Principles

*   **TypeScript for Type Safety**: The SDK is built entirely with TypeScript to ensure strong type checking, which helps in catching errors early during development and provides a better developer experience through autocompletion and clear interfaces.

*   **Test-Driven Development (TDD)**: All features were implemented using a TDD approach. This involved:
    1.  Writing a failing test for a new piece of functionality.
    2.  Implementing the minimum code required to make the test pass.
    3.  Refactoring the code to improve its design and maintainability.

*   **Modularity and Separation of Concerns**: The SDK is designed with modularity in mind, separating different functionalities into distinct components.

## 2. Architectural Components

### a. HTTP Client (`src/core/client.ts`)

This class is responsible for making HTTP requests to the Lord of the Rings API. It encapsulates the logic for sending requests and handling responses. Key features:

*   **Initialization**: Takes `baseUrl` and `apiKey` during instantiation.
*   **`send<T>(request: Request)` method**: A generic method that sends the constructed `Request` object and returns a `Promise<T>`, where `T` is the expected response type (e.g., `MovieResponse`, `QuoteResponse`).
*   **Error Handling**: Catches network or HTTP errors and throws descriptive `Error` objects.

### b. Request Builder (`src/core/request-builder.ts`)

This class provides a fluent interface for constructing HTTP requests. It abstracts away the complexities of URL construction and parameter handling.

*   **Chained Methods**: Allows chaining methods like `setMethod()`, `setPath()`, `addQueryParam()`, `setRequestBody()` to build a request step-by-step.
*   **Parameter Handling**: Manages query parameters, including special handling for filter parameters where the entire filter expression is passed as a key with an empty value (e.g., `rottenTomatoesScore>90`).
*   **`build()` method**: Returns a `Request` object that can be sent by the `HttpClient`.

### c. Type Definitions (`src/types/`)

Dedicated TypeScript interfaces are defined for API responses and data models (e.g., `Movie`, `MovieResponse`, `Quote`, `QuoteResponse`). This ensures type safety throughout the SDK and provides clear data structures for consumers.

### d. API Functions (`src/index.ts`)

The `src/index.ts` file serves as the main entry point for the SDK's public API functions. Each function (e.g., `fetchMovies`, `fetchMovieById`, `fetchQuotes`, `fetchQuoteById`) utilizes the `HttpClient` and `RequestBuilder` to interact with specific API endpoints.

*   **Dependency Injection**: `HttpClient` and `RequestBuilder` instances are optionally injected, allowing for easy mocking in unit tests.
*   **Environment Variable Dependency**: API key and base URL are sourced from environment variables (`LOTR_API_KEY`, `LOTR_API_BASE_URL`) or an injected `envConfig` object for secure and flexible configuration.
*   **Error Propagation**: Errors from the `HttpClient` are caught and re-thrown, providing consistent error handling to the SDK consumer.

## 3. Build and Testing

*   **`tsup`**: Used for bundling the TypeScript code into CommonJS and ES Modules, along with generating declaration files (`.d.ts`).
*   **`Jest`**: The testing framework used for unit and integration tests, ensuring the correctness of the SDK's functionality.

This design aims to provide a clean, maintainable, and extensible SDK that is easy to use and understand for developers. 
