import { T } from "vitest/dist/chunks/reporters.d.BuRON0I0.js"
import type { Movie, Theme } from "../types"

const FAVORITES_KEY = "cinegrid_favorites"
const THEME_KEY = "cinegrid_theme"
const API_KEY = "cinegrid_api_key"

export function getFavorties(): Movie[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    const parsed = JSON.parse(saved ?? "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function toggleFavorite(movie: Movie): Movie[] {
  const favorites = getFavorties()
  const alrSaved = favorites.some((favorite) => favorite.id === movie.id)
  const updated = alrSaved
    ? favorites.filter((favorite) => favorite.id !== movie.id)
    : [...favorites, movie]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  return updated
}

export function getTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY)
  return saved === "light" ? "light" : "dark"
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.setAttribute("data-theme", theme)
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY) ?? ""
}

export function setApiKey(key: string): void {
    localStorage.setItem(API_KEY, key.trim());
}

export const storage = {
    getFavorties, toggleFavorite, getTheme, setTheme, getApiKey, setApiKey,
}

