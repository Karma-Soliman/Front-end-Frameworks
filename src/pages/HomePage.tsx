import { useMovies } from "../hooks/useMovies";
import { useGenres } from "../hooks/useGenres";
import MovieList from "../components/MovieList";
import type { Movie } from "../types";

type HomePageProps = {
  searchQuery?: string;
  favorites?: Movie[];
  onlyFavorites?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
};

function HomePage({ searchQuery = "", favorites = [], onlyFavorites = false,
  onToggleFavorite }: HomePageProps) {
  const { movies, isLoading, error } = useMovies();
  const { genres, isLoading: genresLoading, error: genresError } = useGenres();
  const source = onlyFavorites ? favorites : movies;
  const filteredMovies = source.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  return (
    <main className="main-container movie-page">
      <h1 className="sr-only">{onlyFavorites ? "Your watchlist" : "Browse movies"}</h1>
      {genresLoading && <p className="status-message" role="status">Loading genres...</p>}
      {genresError && <p className="status-message error-message" role="alert">{genresError}</p>}
      {!onlyFavorites && isLoading ? (
        <p className="status-message" role="status">Loading movies...</p>
      ) : !onlyFavorites && error ? (
        <p className="status-message error-message" role="alert">{error}</p>
      ) : (
        <MovieList movies={filteredMovies} genres={genres} favorites={favorites}
          onToggleFavorite={onToggleFavorite} />
      )}
    </main>
  );
}
export default HomePage;
