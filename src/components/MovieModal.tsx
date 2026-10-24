import { useEffect, useId, useRef } from "react"
import { useAppContext } from "../context/AppContext"
import { Heart, X, Youtube } from "lucide-react"
import type { Movie, Genre } from "../types"
import { getPosterUrl, getBackdropUrl } from "../data/sampleMovies"

type MovieModalProps = {
  movie: Movie
  genres: Genre[]
  onClose: () => void
}

function MovieModal({
  movie,
  genres,
  onClose,
}: MovieModalProps) {
  const { isFavorite, toggleFavorite } = useAppContext()
  const saved = isFavorite(movie.id)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  const movieGenres = genres.filter((genre) =>
    movie.genre_ids.includes(genre.id),
  )

  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.title} official trailer`,
  )}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = "hidden"

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="modal-overlay active movie-details-modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="modal-dialog">
        <button
          className="modal-close-btn"
          aria-label="Close movie details"
          onClick={onClose}
          autoFocus
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div
          className="modal-backdrop-hero"
          style={{
            backgroundImage: `url("${getBackdropUrl(movie.backdrop_path)}")`,
          }}
          aria-hidden="true"
        />

        <div className="modal-body">
          <img
            className="modal-poster"
            src={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
          />

          <div className="modal-content-details">
            <h2 id={titleId} className="modal-title">
              {movie.title}
            </h2>

            <div className="modal-meta-row">
              <span className="modal-meta-item">
                ★ {movie.vote_average.toFixed(1)} / 10
              </span>
              <span className="modal-meta-item">
                Release: {movie.release_date || "Not announced"}
              </span>
            </div>

            <div className="movie-genres-tags">
              {movieGenres.map((genre) => (
                <span className="genre-tag" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="modal-overview">
              {movie.overview || "No overview available."}
            </p>

            <div className="modal-footer-actions">
                <button
                  className="btn-primary"
                  aria-pressed={saved}
                  onClick={() => toggleFavorite(movie)}
                >
                  <Heart
                    size={18}
                    fill={saved ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                  {saved ? "Remove from watchlist" : "Add to watchlist"}
                </button>

              <a
                className="btn-secondary"
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={18} aria-hidden="true" />
                Find trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default MovieModal
