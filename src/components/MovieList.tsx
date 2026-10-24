import type { Movie, Genre, ViewMode } from "../types";
import MovieCard from "./MovieCard";

type MovieListProp = {
  movies: Movie[]
  genres?: Genre[]
  favorites?: Movie[]
  onToggleFavorite?: (movie: Movie) => void
  viewMode?: ViewMode
  onSelectMovie?: (movie: Movie) => void
}
function MovieList({ movies, genres = [], favorites = [], onToggleFavorite, viewMode = "grid", onSelectMovie }: MovieListProp) {
  if (movies.length === 0) return <p className="empty-state">No movies found.</p>;
  return (
    <div className={`movies-grid${viewMode === "list" ? " compact-view" : ""}`}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genres={genres}
          isFavorite={
            onToggleFavorite
              ? favorites.some((item) => item.id === movie.id)
              : undefined
          }
          onToggleFavorite={onToggleFavorite}
          onClick={onSelectMovie ? () => onSelectMovie(movie) : undefined}
        />
      ))}
    </div>
  )
}
export default MovieList;
