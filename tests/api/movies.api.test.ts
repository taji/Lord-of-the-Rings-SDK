import { fetchMovieById, fetchMovies } from '../../src/index';
import { Movie, MovieResponse } from '../../src/types/movie';

describe('Movie API', () => {
  it('should fetch movies successfully', async () => {
    const movies: MovieResponse = await fetchMovies();
    expect(movies).toBeDefined();
    expect(movies.docs.length).toBeGreaterThan(0);
  });

  it('should fetch movies by id', async () => {
    const movieId = '5cd95395de30eff6ebccde56'; // Example ID for "The Lord of the Rings Series" 
    const movies: MovieResponse = await fetchMovieById(movieId);
    expect(movies).toBeDefined();
    expect(movies.docs.length).toBe(1);
    expect(movies.docs[0]._id).toBe(movieId);
    expect(movies.docs[0].name).toBe('The Lord of the Rings Series');
  });

  it('should fetch movies with a filter', async () => {
    const filteredMovies: MovieResponse = await fetchMovies({ filter: 'rottenTomatoesScore>90' });
    expect(filteredMovies).toBeDefined();
    expect(filteredMovies.docs.length).toBeGreaterThan(0);
    filteredMovies.docs.forEach((movie: any) => {
      expect(movie.rottenTomatoesScore).toBeGreaterThan(90);
    });
  });
});

