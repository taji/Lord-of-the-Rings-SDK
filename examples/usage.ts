import { fetchMovies, fetchMovieById, fetchQuotes, fetchQuoteById } from '../src/index';

async function demonstrateSdkUsage() {
  console.log('\n--- Demonstrating SDK Usage --- \n');

  // --- Movies --- 
  console.log('\n--- Movies --- \n');

  // Fetch all movies
  try {
    const allMovies = await fetchMovies();
    console.log('All Movies (' + allMovies.docs.length + '):', allMovies.docs.map(m => m.name));
  } catch (error) {
    console.error('Error fetching all movies:', error);
  }

  // Fetch movies with a filter (e.g., Rotten Tomatoes score > 90)
  try {
    const filteredMovies = await fetchMovies({ filter: 'rottenTomatoesScore>90' });
    console.log('Filtered Movies (rottenTomatoesScore > 90) (' + filteredMovies.docs.length + '):', filteredMovies.docs.map(m => m.name));
  } catch (error) {
    console.error('Error fetching filtered movies:', error);
  }

  // Fetch a single movie by ID
  try {
    const movieId = '5cd95395de30eff6ebccde56'; // Example ID for "The Lord of the Rings Series"
    const singleMovie = await fetchMovieById(movieId);
    console.log('Single Movie (' + singleMovie.docs.length + '):', singleMovie.docs[0].name);
  } catch (error) {
    console.error('Error fetching single movie:', error);
  }

  // --- Quotes --- 
  console.log('--- Quotes ---');
  console.log('Warning: Fetching all quotes will retrieve a large number of results (over 1000).');

  // Fetch all quotes
  try {
    const allQuotes = await fetchQuotes();
    console.log('All Quotes (' + allQuotes.docs.length + '):', allQuotes.docs.map(q => q.dialog));
  } catch (error) {
    console.error('Error fetching all quotes:', error);
  }

  // Fetch a single quote by ID
  try {
    const quoteId = '5cd96e05de30eff6ebcced57'; // Example ID for a quote
    const singleQuote = await fetchQuoteById(quoteId);
    console.log('Single Quote (' + singleQuote.docs.length + '):', singleQuote.docs[0].dialog);
  } catch (error) {
    console.error('Error fetching single quote:', error);
  }

  console.log('\n--- SDK Usage Demonstration Complete --- \n');
}

demonstrateSdkUsage();