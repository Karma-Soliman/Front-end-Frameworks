import { LayoutGrid, List } from "lucide-react"
import type { Genre, SortOption, ViewMode } from "../types"

type FilterBarProps = {
  genres: Genre[]
  selectedGenre: number
  onGenreChange: (genre: number) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  viewMode: ViewMode
  onViewChange: (view: ViewMode) => void
}

function FilterBar({
  genres,
  selectedGenre,
  onGenreChange,
  sort,
  onSortChange,
  viewMode,
  onViewChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="genre-pills-scroll" aria-label="Filter by genre">
        <button
          className={`genre-pill${selectedGenre === 0 ? " active" : ""}`}
          aria-pressed={selectedGenre === 0}
          onClick={() => onGenreChange(0)}
        >
          {" "}
          All genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-pill${selectedGenre === genre.id ? " active" : ""}`}
            aria-pressed={selectedGenre === genre.id}
            onClick={() => onGenreChange(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="filter-actions-right">
        <div className="sort-select-wrapper">
          <select
            className="sort-select"
            aria-label="Sort movies"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            <option value="popularity">Most popular</option>
            <option value="rating">Highest rated</option>
            <option value="release_date">Newest releases</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
        <div
          className="view-toggle-group"
          role="group"
          aria-label="Movie layout"
        >
          <button
            className={`view-btn${viewMode === "grid" ? " active" : ""}`}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid size={18} aria-hidden="true" />
          </button>

          <button
            className={`view-btn${viewMode === "list" ? " active" : ""}`}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            onClick={() => onViewChange("list")}
          >
            <List size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
