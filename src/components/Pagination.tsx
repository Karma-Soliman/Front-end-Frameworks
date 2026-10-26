type PaginationProps = {
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, isLoading, onPageChange }: PaginationProps) {
  if (totalPages <= 1 && page === 1) return null;

  return (
    <nav className="pagination-container" aria-label="Movie pages">
      <button className="page-btn" disabled={isLoading || page <= 1}
        onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <form className="page-info page-jump" key={`${page}-${totalPages}`}
        onSubmit={event => {
          event.preventDefault();
          const target = Number(new FormData(event.currentTarget).get("page"));
          if (!isLoading && Number.isInteger(target) && target >= 1 && target <= totalPages && target !== page) {
            onPageChange(target);
          }
        }}>
        <span>{isLoading ? "Loading page" : "Page"}</span>
        <input className="page-number-input" name="page" type="number"
          aria-label="Page number" title="Enter a page number and press Enter"
          min={1} max={totalPages} step={1} required defaultValue={page}
          onFocus={event => event.currentTarget.select()}
          onBlur={event => { event.currentTarget.value = String(page); }}
          onKeyDown={event => {
            if (event.key === "Escape") event.currentTarget.blur();
          }}
          disabled={isLoading} />
        <span>of {totalPages}</span>
      </form>
      <button className="page-btn" disabled={isLoading || page >= totalPages}
        onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}
