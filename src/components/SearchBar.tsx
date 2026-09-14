type SearchBarProp = {
    query: string;
    onChange: (value: string) => void;
};

function SearchBar({ query, onChange }: SearchBarProp) {
    return (
        <input type="text" value={query} onChange={(event) => onChange(event.target.value)}
            placeholder=" Looking for something .... " />
    );
}

export default SearchBar;