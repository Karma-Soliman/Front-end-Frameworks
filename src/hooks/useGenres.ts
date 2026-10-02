import { useState, useEffect } from "react";
import type { Genre } from "../types";

export function useGenres() {
    const [genres, setGenre] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController();
        async function loadGenres() {
            setIsLoading(true);
            setError(null);
            try {
                const token = import.meta.env.VITE_TMDB_API_KEY?.trim();
                if (!token) {
                    throw new Error("A TMDB token is required to load genres.");
                }
                const baseUrl = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
                const response = await fetch(
                    `${baseUrl}/genre/movie/list?language=en-US`,
                    {
                        signal: controller.signal,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch genre (${response.status})`);
                }
                const data: { genres: Genre[] } = await response.json();
                if (!controller.signal.aborted) {
                    setGenre(data.genres);
                }
            } catch (err) {
                if (controller.signal.aborted) return
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError(err instanceof Error ? err.message : "Could not load genres")
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }
        loadGenres();
        return () => {
            controller.abort()
        }
    }, []);
    return {genres, isLoading, error}
}
