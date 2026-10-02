import { useState } from "react"
import { useMovies } from "./hooks/useMovies"
import { useGenres } from "./hooks/useGenres"
import MovieList from "./components/MovieList"
import SearchBar from "./components/SearchBar"

function App() {
  const { movies, isLoading, error } = useMovies();
  const { genres, isLoading: genresLoading, error: genresError } = useGenres()
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchingRating = movie.vote_average >= minRating;
    return matchesQuery && matchingRating;
  });

  return (
    <div>
      <h1>Movie App</h1>
      <SearchBar query={query} onChange={setQuery} />
      {genresLoading && <p role="status">Loading genres...</p>}
      {genresError && <p role="alert">{genresError}</p>}
      {isLoading ? (
        <p role="status">Loading movies...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <MovieList movies={filteredMovies} genres={genres} />
      )}
    </div>
  )
}

export default App
