# Lord of the Rings SDK

A TypeScript SDK for interacting with the [Lord of the Rings API](https://the-one-api.dev/)

## Installation

```bash
npm install
```

## Usage

### Initialization

Ensure you have a `.env` file in the project root with your API key and base URL:

```
LOTR_API_KEY=YOUR_API_KEY_HERE
LOTR_API_BASE_URL=https://the-one-api.dev/v2
```

### Fetching Movies

```typescript
import { fetchMovies, fetchMovieById } from './src/index';

async function getMovies() {
  // Fetch all movies
  const allMovies = await fetchMovies();
  console.log('All Movies:', allMovies.docs.map(m => m.name));

  // Fetch movies with a filter (e.g., Rotten Tomatoes score > 90)
  const filteredMovies = await fetchMovies({ filter: 'rottenTomatoesScore>90' });
  console.log('Filtered Movies (rottenTomatoesScore > 90):', filteredMovies.docs.map(m => m.name));

  // Fetch a single movie by ID
  const singleMovie = await fetchMovieById('5cd95395de30eff6ebccde56'); // Example ID
  console.log('Single Movie:', singleMovie.docs[0].name);
}

getMovies();
```

### Fetching Quotes

```typescript
import { fetchQuotes, fetchQuoteById } from './src/index';

async function getQuotes() {
  // Fetch all quotes
  const allQuotes = await fetchQuotes();
  console.log('All Quotes:', allQuotes.docs.map(q => q.dialog));

  // Fetch a single quote by ID
  const singleQuote = await fetchQuoteById('5cd96e05de30eff6ebcced57'); // Example ID
  console.log('Single Quote:', singleQuote.docs[0].dialog);
}

getQuotes();
```

## Testing

To run the tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Build

To build the SDK:

```bash
npm run build
```

## Example Usage

To run the example script that demonstrates the SDK's functionality:

1.  **Set Environment Variables**: Ensure you have a `.env` file in the project root with your Lord of the Rings API key and base URL. 

For the LOTR_API_KEY value, register with the LOTR Website [here](https://the-one-api.dev/) and they will provide the Access Token to use as your key.

The format of the .env file is: 

    ```
    LOTR_API_KEY=YOUR_API_KEY_HERE
    LOTR_API_BASE_URL=https://the-one-api.dev/v2
    ```

The `usage.ts` script reads these variables on startup.

2.  **Run the Example**: Execute the following command in your terminal:

    ```bash
    npm run example
    ```

    This will execute `examples/usage.ts` and print the output to your console, showcasing various API calls.
