import { Search } from "lucide-react";

type SearchBarProp = { query: string; onChange: (value: string) => void };

function SearchBar({ query, onChange }: SearchBarProp) {
  return (
    <div className="search-input-wrapper">
      <Search className="search-icon" aria-hidden="true" />
      <input className="search-input" type="text" aria-label="Search movies"
        value={query} onChange={event => onChange(event.target.value)}
        placeholder="Search movies by title..." />
    </div>
  );
}
export default SearchBar;
