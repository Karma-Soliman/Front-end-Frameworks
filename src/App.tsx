import { useState } from "react"
import { useMovies } from "./hooks/useMovies"
import MovieList from "./components/MovieList"
import SearchBar from "./components/SearchBar"

function App() {
  const { movies, isLoading, error } = useMovies()
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
      {isLoading ? (<p role="status">Loading movies...</p>) : error ? (
        <p role="alert">{error}</p>
      ) : (<MovieList movies={filteredMovies}/>)}
    </div>
  );
}

export default App
