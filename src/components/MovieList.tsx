import type { Movie, Genre, ViewMode } from "../types";
import MovieCard from "./MovieCard";

type MovieListProp = {
  movies: Movie[]
  genres?: Genre[]
  viewMode?: ViewMode
  onSelectMovie?: (movie: Movie) => void
}
function MovieList({ movies, genres = [], viewMode = "grid", onSelectMovie }: MovieListProp) {
  if (movies.length === 0) return <p className="empty-state">No movies found.</p>;
  return (
    <div className={`movies-grid${viewMode === "list" ? " compact-view" : ""}`}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genres={genres}
          onClick={onSelectMovie ? () => onSelectMovie(movie) : undefined}
        />
      ))}
    </div>
  )
}
export default MovieList;
