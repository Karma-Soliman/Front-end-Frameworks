import { useState } from "react";
import { AppProvider } from "./context/AppContext"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ApiConfigModal from "./components/ApiConfigModal";

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header
          search={searchQuery}
          onSearch={setSearchQuery}
          onlyFavorites={onlyFavorites}
          onToggleFavorites={() => setOnlyFavorites((value) => !value)}
          onOpenApiConfig={() => setIsApiConfigOpen(true)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchQuery={searchQuery}
                onlyFavorites={onlyFavorites}
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
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
export default App
