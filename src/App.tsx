import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ApiConfigModal from "./components/ApiConfigModal"
import { storage } from "./utils/storage";
import type { Movie } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(storage.getTheme);
  const [favorites, setFavorites] = useState(storage.getFavorites);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => { storage.setTheme(theme); }, [theme]);

  function toggleFavorite(movie: Movie) {
    setFavorites(storage.toggleFavorite(movie));
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header
          search={searchQuery}
          onSearch={setSearchQuery}
          onlyFavorites={onlyFavorites}
          onToggleFavorites={() => setOnlyFavorites((value) => !value)}
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          favCount={favorites.length}
          onOpenApiConfig={() => setIsApiConfigOpen(true)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchQuery={searchQuery}
                favorites={favorites}
                onlyFavorites={onlyFavorites}
                onToggleFavorite={toggleFavorite}
                refreshKey={refreshKey}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {isApiConfigOpen && (
          <ApiConfigModal
            onClose={() => setIsApiConfigOpen(false)}
            onSaved={() => {
              setRefreshKey((value) => value + 1)
              setIsApiConfigOpen(false)
            }}
          />
        )}
      </div>
    </BrowserRouter>
  )
}
export default App;
