import { Link } from "react-router-dom";

function AboutPage() {
    return (
      <main className="main-container">
        <h1>About CineGrid</h1>
        <p>
          A movie discovery app built with React and the TMDB API. Browse
          movies, explore genres, and keep track of favorites. Movie data is
          provided by TMDB.
        </p>
        <Link to="/">Back to Movies</Link>
      </main>
    )
}

export default AboutPage;