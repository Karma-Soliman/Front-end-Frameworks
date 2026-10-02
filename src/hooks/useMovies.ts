import { useState, useEffect } from "react"
import { movieService } from "../services/movieService"
import type { Movie } from "../types"

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    async function loadMovies() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await movieService.fetchMovies({
          signal: controller.signal,
        })
        if (!controller.signal.aborted) {
          setMovies(data.results)
        }
      } catch (err) {
        if (controller.signal.aborted) return
        if (err instanceof DOMException && err.name === "AbortError") return

        setError(err instanceof Error ? err.message : "Could not load movies")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }
    loadMovies()
    return () => {
      controller.abort()
    }
  }, [])

  return { movies, isLoading, error }
}
