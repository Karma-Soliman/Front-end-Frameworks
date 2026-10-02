import { useState, useEffect } from "react"
import { movieService } from "./services/movieService";
import type { Movie } from "./types";
import MovieList from "./components/MovieList"
import SearchBar from "./components/SearchBar"

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await movieService.fetchMovies({
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setMovies(data.results);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        if (err instanceof DOMException && err.name === "AbortError") return;

        setError( err instanceof Error ? err.message : "Could not load movies")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }
    loadMovies()
    return () => {
      controller.abort();
    };
  }, [])

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchingRating = movie.vote_average >= minRating;
    return matchesQuery && matchingRating;
  });

  return (
    <div>
      <h1>Movie App</h1>
      <SearchBar query={query} onChange={setQuery} />
      {isLoading ? (<p role="status">Loading movies...</p>) : error ? (
        <p role="alert">{error}</p>
      ) : (<MovieList movies={filteredMovies}/>)}
    </div>
  );
}

export default App
