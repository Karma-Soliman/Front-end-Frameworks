import { createContext, useContext, useEffect, useReducer } from "react"
import type { ReactNode } from "react"
import type { Movie, Theme } from "../types"
import { storage } from "../utils/storage"

type AppContextValue = {
  theme: Theme
  toggleTheme: () => void
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
  isFavorite: (id: number) => boolean
}

const AppContext = createContext<AppContextValue | null>(null)

type State = {
  theme: Theme
  favorites: Movie[]
}
type Action =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme }

type AppProviderProps = {
  children: ReactNode
}

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadySaved = state.favorites.some(
        (movie) => movie.id === action.payload.id,
      )

      const favorites = alreadySaved
        ? state.favorites.filter((movie) => movie.id !== action.payload.id)
        : [...state.favorites, action.payload]

      return { ...state, favorites }
    }

    case "SET_THEME":
      return { ...state, theme: action.payload }

    default:
      return state
  }
}

function createInitialState(): State {
  return {
    theme: storage.getTheme(),
    favorites: storage.getFavorites(),
  }
}


export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(
    appReducer,
    undefined,
    createInitialState,
  )

  useEffect(() => {
    storage.setTheme(state.theme)
  }, [state.theme])

  function toggleTheme() {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    })
  }

  function toggleFavorite(movie: Movie) {
    storage.toggleFavorite(movie)

    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: movie,
    })
  }

  function isFavorite(id: number) {
    return state.favorites.some((movie) => movie.id === id)
  }

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        favorites: state.favorites,
        toggleTheme,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (context === null) {
    throw new Error("useAppContext must be used within AppProvider")
  }

  return context
}
