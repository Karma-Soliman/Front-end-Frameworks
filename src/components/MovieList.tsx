import type { Movie, Genre } from "../types";
import MovieCard from "./MovieCard";

type MovieListProp = {
    movies: Movie[];
    genres: Genre[];
};

function MovieList({ movies, genres = [] }: MovieListProp) {
    if (movies.length === 0) {
        return <p>No movies found.</p>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />))}
        </div>
    )
}

export default MovieList