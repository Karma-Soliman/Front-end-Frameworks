import { SAMPLE_MOVIES } from "../data/sampleMovies";
import type { Movie, SortOption } from "../types";
import { storage } from "../utils/storage";

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

function sortMovies(movies: Movie[], sort: SortOption): Movie[]{
    return [...movies].sort((a, b) => {
        switch (sort) {
            case "rating":
                return b.vote_average - a.vote_average;
            case "release_date":
                return b.release_date.localeCompare(a.release_date);
            case "title":
                return a.title.localeCompare(b.title);
            case "popularity":
                return b.popularity - a.popularity;
        }
    });
}

export const movieService = {
    async fetchMovies({ search = "", genre, sort= "popularity", onlyFavorites=false, page = 1, signal }:
        FetchMoviesOptions = {}
    ): Promise < MovieResponse > {
        const query = search.trim();
        const apiKey = storage.getApiKey();

        const hasGenre = genre !== undefined && genre !== 0;

        if (onlyFavorites || !apiKey) {
            const source = onlyFavorites ? storage.getFavorites() : SAMPLE_MOVIES;
            const filtered = source.filter(movie => {
                const matchesSearch = movie.title.toLowerCase().includes(query.toLowerCase());
                const matchesGenre = !hasGenre || movie.genre_ids.includes(genre!);
                return matchesSearch && matchesGenre;
            });
            const results = sortMovies(filtered, sort);
            return {
                results, total_pages: 1, total_results: results.length, isLiveApi: false,
            };
        }
       
        const baseUrl =
            import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
        
        const params = new URLSearchParams({ api_key: apiKey, language: "en-US", page: String(page), })
        let endpoint = "/movie/popular";
        if (query) {
            endpoint = "/search/movie"
            params.set("query", query);
        } else if (hasGenre) {
            endpoint = "/discover/movie";
            params.set("with_genres", String(genre));
        }
        const response = await fetch(`${baseUrl}${endpoint}?${params}`,
            {
                signal,
                headers: {
                    accept: "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch movies (${response.status})`);
        }
        const data: Omit<MovieResponse, "isLiveApi"> = await response.json();
        const filtered = query && hasGenre ? data.results.filter(movie => movie.genre_ids.includes(genre!)) : data.results;

        return {
            results: sortMovies(filtered,sort),
            total_pages: data.total_pages,
            total_results: data.total_results,
            isLiveApi: true
        };
    },
}

