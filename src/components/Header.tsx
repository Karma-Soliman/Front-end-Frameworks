import { NavLink } from "react-router-dom";
import { Heart, Moon, Sun, Settings } from "lucide-react";
import SearchBar from "./SearchBar";
import type { Theme } from "../types";

type HeaderProps = {
  search: string
  onSearch: (value: string) => void
  onlyFavorites: boolean
  onToggleFavorites: () => void
  theme: Theme
  onToggleTheme: () => void
  favCount: number
  onOpenApiConfig?: () => void
}

function Header({search, onSearch,  onlyFavorites,
    onToggleFavorites, theme, onToggleTheme, favCount, onOpenApiConfig
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          <NavLink to="/" className="brand-logo" aria-label="CineGrid">
            <span className="logo-dot" />
            <span className="logo-text">CINE·GRID</span>
          </NavLink>

          <nav className="header-nav" aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>

        <div className="header-search">
          <SearchBar query={search} onChange={onSearch} />
        </div>

        <div className="header-actions">
          <NavLink
            to="/"
            className={`btn-icon-label${onlyFavorites ? " active" : ""}`}
            onClick={onToggleFavorites}
            aria-label={`${
              onlyFavorites ? "Show all movies" : "Show watchlist"
            } (${favCount})`}
          >
            <Heart size={16} aria-hidden="true" />
            <span>Watchlist</span> {favCount}
          </NavLink>

          <button
            className="theme-toggle-btn"
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
            onClick={onToggleTheme}
          >
            {theme === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>

          {onOpenApiConfig && (
            <button
              className="btn-icon-label"
              aria-label="Configure API key"
              onClick={onOpenApiConfig}
            >
              <Settings size={16} aria-hidden="true" />
              <span>API Key</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;