import { SAMPLE_MOVIES } from "../data/sampleMovies";
import type { Movie, SortOption } from "../types";

type FetchMoviesOptions = {
    search?: string;
    genre?: number;
    sort?: SortOption;
    onlyFavorites?: boolean;
    page?: number;
    signal?: AbortSignal;
};

type MovieResponse = {
    results: Movie[];
    total_pages: number;
    total_results: number;
    isLiveApi: boolean;
};

export const movieService = {
    async fetchMovies({ search = "", page = 1, signal }:
        FetchMoviesOptions = {}
    ): Promise < MovieResponse > {
        const query = search.trim();
        const token = import.meta.env.VITE_TMDB_API_KEY?.trim();

        //if no token use sample movies
        if (!token) {
            const results = SAMPLE_MOVIES.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
            return { results, total_pages: 1, total_results: results.length, isLiveApi: false }
        }
        const baseUrl =
            import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
        // with token
        const endpoint = query ? "/search/movie" : "/movie/popular";
        const params = new URLSearchParams({ language: "en-US", page: String(page), })
        if (query) {
            params.set("query", query);
        }
        const response = await fetch(`${baseUrl}${endpoint}?${params}`,
            {
                signal,
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch movies (${response.status})`);
        }
        const data = await response.json();
        return {
            results: data.results,
            total_pages: data.total_pages,
            total_results: data.total_results,
            isLiveApi: true
        };
    },
}

