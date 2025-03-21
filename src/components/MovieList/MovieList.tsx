import { Movie } from '../../App';

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (imdbID: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  if (movies.length === 0) {
    return <div className="no-results">No movies found. Try a different search!</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-card" onClick={() => onSelectMovie(movie.imdbID)}>
          <div className="movie-poster">
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
          </div>
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <span className="movie-type">{movie.Type}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
