import { fetchMovies } from '../src/index';

describe('Movie API', () => {
  it('should fetch movies successfully', async () => {
    const movies = await fetchMovies();
    expect(movies).toBeDefined();
    expect(movies.docs.length).toBeGreaterThan(0);
  });

  it('should fetch movies with a filter', async () => {
    const filteredMovies = await fetchMovies({ filter: 'rottenTomatoesScore>90' });
    expect(filteredMovies).toBeDefined();
    expect(filteredMovies.docs.length).toBeGreaterThan(0);
    filteredMovies.docs.forEach((movie: any) => {
      expect(movie.rottenTomatoesScore).toBeGreaterThan(90);
    });
  });
});

