import type { Movie } from "../types";
import MovieCard from "./MovieCard";

type MovieListProp = {
    movies: Movie[];
};

function MovieList({ movies }: MovieListProp) {
    if (movies.length === 0) {
        return <p>No movies found.</p>;
    }
    return (
        <div>
            {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>))}
        </div>
    )
}

export default MovieList