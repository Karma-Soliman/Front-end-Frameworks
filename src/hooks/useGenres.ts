import { useState, useEffect } from "react";
import { storage } from "../utils/storage";
import type { Genre } from "../types";

export function useGenres(refreshKey = 0) {
  const [genres, setGenre] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    async function loadGenres() {
      setIsLoading(true)
      setError(null)
      setGenre([])
      try {
        const apiKey = storage.getApiKey()
        if (!apiKey) {
          throw new Error("Add a TMDB API key to load genres.")
        }
        const baseUrl =
          import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3"
        const params = new URLSearchParams({
          api_key: apiKey,
          language: "en-US",
        })
        const response = await fetch(
          `${baseUrl}/genre/movie/list?${params}`,
          {
            signal: controller.signal,
            headers: {
              accept: "application/json",
            },
          },
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch genre (${response.status})`)
        }
        const data: { genres: Genre[] } = await response.json()
        if (!Array.isArray(data.genres)) {
          throw new Error("Could not load genres: invalid response.")
        }
        if (!controller.signal.aborted) {
          setGenre(data.genres)
        }
      } catch (err) {
        if (controller.signal.aborted) return
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Could not load genres")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }
    loadGenres()
    return () => {
      controller.abort()
    }
  }, [refreshKey])
  return { genres, isLoading, error }
}
