import { useState, useEffect } from "react"
import { movieService } from "../services/movieService"
import type { Movie, SortOption } from "../types"

type UseMoviesOptions = {
  search?: string
  genre?: number
  sort?: SortOption
  onlyFavorites?: boolean
  favoritesKey?: string
  refreshKey?: number;
  page?: number;
}

export function useMovies({
  search = "", genre = 0, sort = "popularity", onlyFavorites = false, favoritesKey = "", refreshKey = 0, page = 1,
}: UseMoviesOptions = {}) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiveApi, setIsLiveApi] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const controller = new AbortController()
    async function loadMovies() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await movieService.fetchMovies({
          search,
          genre,
          sort,
          onlyFavorites,
          page,
          signal: controller.signal,
        })
        if (!controller.signal.aborted) {
          setMovies(data.results)
          setIsLiveApi(data.isLiveApi)
          setTotalPages(data.total_pages)
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
  }, [search, genre, sort, onlyFavorites, favoritesKey, refreshKey, page])

  return { movies, isLoading, error, isLiveApi, totalPages }
}
