import { Film, Star, Tags, Database } from "lucide-react"
import type { Movie } from "../types"

type StatsBannerProps = {
  movies: Movie[]
  genreName: string
  isLiveApi: boolean
}

function StatsBanner({ movies, genreName, isLiveApi }: StatsBannerProps) {
  const averageRating =
    movies.length > 0
      ? movies.reduce((total, movie) => total + movie.vote_average, 0) /
        movies.length
      : null

  return (
    <section className="stats-banner" aria-label="Movie statistics">
      <div className="stat-card">
        <div className="stat-icon">
          <Film size={20} aria-hidden="true" />
        </div>
        <div className="stat-info">
          <span className="stat-value">{movies.length}</span>
          <span className="stat-label">Movies shown</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Star size={20} aria-hidden="true" />
        </div>
        <div className="stat-info">
          <span className="stat-value">
            {averageRating === null ? "—" : averageRating.toFixed(1)}
          </span>
          <span className="stat-label">Average rating / 10</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Tags size={20} aria-hidden="true" />
        </div>
        <div className="stat-info">
          <span className="stat-value">{genreName}</span>
          <span className="stat-label">Selected genre</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Database size={20} aria-hidden="true" />
        </div>
        <div className="stat-info">
          <span className="stat-value">
            {isLiveApi ? "Live API" : "Local data"}
          </span>
          <span className="stat-label">Movie source</span>
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
