import { useState } from 'react';
import type { Movie, Genre } from "../types";
import { getPosterUrl } from "../data/sampleMovies"

type MovieCardProp = {
    movie: Movie, genres: Genre[], onClick?: () => void;
};

function MovieCard({ movie, genres =[], onClick }: MovieCardProp) {
    const [isFavorite, setIsFavorite] = useState(false);
    const genreNames = genres.filter(genre => movie.genre_ids.includes(genre.id)).map(genre => genre.name)
    return (
      <article>
        <div onClick={onClick}>
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
          />
          <h2>{movie.title}</h2>
          <p>{movie.vote_average.toFixed(1)}</p>
          {genreNames.length > 0 && <p>{genreNames.join(", ")}</p>}
        </div>
        <button onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? "Remove from favourites" : "Add to favourites"}
        </button>
      </article>
    )
}
export default MovieCard