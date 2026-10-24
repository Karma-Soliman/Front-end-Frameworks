import { useMovies } from "../hooks/useMovies";
import { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import MovieList from "../components/MovieList";
import FilterBar from "../components/FilterBar";
import StatsBanner from "../components/StatsBanner"
import type { Movie, SortOption, ViewMode } from "../types";

type HomePageProps = {
  searchQuery?: string;
  favorites?: Movie[];
  onlyFavorites?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
};

function HomePage({ searchQuery = "", favorites = [], onlyFavorites = false,
  onToggleFavorite }: HomePageProps) {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [sort, setSort] = useState<SortOption>("popularity");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const favoritesKey = onlyFavorites ? favorites.map(movie => movie.id).join(",") : "";

  const { movies, isLoading, error, isLiveApi } = useMovies({search: searchQuery, genre: selectedGenre, sort, onlyFavorites, favoritesKey,});
  const { genres, isLoading: genresLoading, error: genresError } = useGenres();
  const genreName =
    selectedGenre === 0
      ? "All genres"
      : (genres.find((genre) => genre.id === selectedGenre)?.name ??
        "Unknown genre")

  return (
    <main className="main-container movie-page">
      <h1 className="sr-only">{onlyFavorites ? "Your watchlist" : "Browse movies"}</h1>
      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />
      {!isLoading && !error && (
      <StatsBanner
        movies={movies}
        genreName={genreName}
        isLiveApi={isLiveApi}
      />
    )}
      {genresLoading && <p className="status-message" role="status">Loading genres...</p>}
      {genresError && <p className="status-message error-message" role="alert">{genresError}</p>}
      {isLoading ? (
        <p className="status-message" role="status">Loading movies...</p>
      ) : error ? (
        <p className="status-message error-message" role="alert">{error}</p>
      ) : (
        <MovieList movies={movies} genres={genres} favorites={favorites}
          onToggleFavorite={onToggleFavorite} viewMode={viewMode} />
      )}
    </main>
  );
}
export default HomePage;
