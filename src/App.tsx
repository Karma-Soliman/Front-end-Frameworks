import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { storage } from "./utils/storage";
import type { Movie } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(storage.getTheme);
  const [favorites, setFavorites] = useState(storage.getFavorites);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

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
          onToggleFavorites={() => setOnlyFavorites(value => !value)}
          theme={theme}
          onToggleTheme={() =>
            setTheme(current => current === "dark" ? "light" : "dark")
          }
          favCount={favorites.length}
        />
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery}
            favorites={favorites} onlyFavorites={onlyFavorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
