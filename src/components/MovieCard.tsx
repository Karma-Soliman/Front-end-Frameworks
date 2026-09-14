import { useState } from 'react';
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies"

type MovieCardProp = {
    movie: Movie, onClick?: () => void;
};

function MovieCard({ movie, onClick }: MovieCardProp) {
    const [isFavorite, setIsFavorite] = useState(false);
    return (
        <article>
            <div onClick={onClick}>
                <img src={getPosterUrl(movie.poster_path)} alt={`${movie.title} poster`} />
                <h2>{movie.title}</h2>
                <p>{movie.vote_average.toFixed(1)}</p>
            </div>
            <button onClick={() => setIsFavorite(!isFavorite)}>{isFavorite ? "Remove from favourites" : "Add to favourites"}
            </button>
        </article>
    );
}
export default MovieCard