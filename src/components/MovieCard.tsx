import { useAppContext } from "../context/AppContext";
import { Heart } from "lucide-react";
import type { Movie, Genre } from "../types";
import { getPosterUrl } from "../data/sampleMovies";

type MovieCardProp = {
  movie: Movie;
  genres?: Genre[];
  onClick?: () => void;
};

function MovieCard({ movie, genres = [], onClick }: MovieCardProp) {
  const { isFavorite, toggleFavorite } = useAppContext();
  const saved = isFavorite(movie.id);
  const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));
  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        {onClick ? ( <button className="poster-open-btn" aria-label={`View details for ${movie.title}`} onClick={onClick} >
            <img className="poster-img" src={getPosterUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy" />
          </button>
        ) : (
          <img className="poster-img" src={getPosterUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy"/>
        )}
        <button
          className={`favorite-btn card-favorite${saved ? " is-favorite" : ""}`}
          aria-label={saved ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={saved}
          onClick={() => toggleFavorite(movie)}
        >
          <Heart
            size={17}
            fill={saved ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">
          {onClick ? (
            <button onClick={onClick}>{movie.title}</button>
          ) : (
            movie.title
          )}
        </h2>
        <div className="movie-card-meta">
          <span>{movie.release_date?.slice(0, 4) || "Release TBA"}</span>
          <span>{movie.vote_count.toLocaleString("en-US")} votes</span>
        </div>
        <p
          className="card-rating"
          aria-label={`Rating ${movie.vote_average.toFixed(1)} out of 10`}
        >
          ★ {movie.vote_average.toFixed(1)}
        </p>
        <div className="movie-genres-tags">
          {movieGenres.map((genre) => (
            <span className="genre-tag" key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
export default MovieCard;
