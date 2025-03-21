import { MovieDetail } from '../../App';

interface MovieDetailsProps {
  movie: MovieDetail;
  onBack: () => void;
}

function MovieDetails({ movie, onBack }: MovieDetailsProps) {
  return (
    <div className="movie-details">
      <button className="back-button" onClick={onBack}>
        ← Back to Results
      </button>

      <div className="details-content">
        <div className="details-header">
          <div className="poster-container">
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
          </div>

          <div className="title-info">
            <h2>{movie.Title} ({movie.Year})</h2>
            <div className="movie-meta">
              <span>{movie.Rated}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
              <span>{movie.Released}</span>
            </div>

            <div className="ratings">
              {movie.Ratings && movie.Ratings.map((rating, index) => (
                <div key={index} className="rating">
                  <strong>{rating.Source}:</strong> {rating.Value}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="plot">
          <h3>Plot</h3>
          <p>{movie.Plot}</p>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <h3>Director</h3>
            <p>{movie.Director}</p>
          </div>
          <div className="detail-item">
            <h3>Writers</h3>
            <p>{movie.Writer}</p>
          </div>
          <div className="detail-item">
            <h3>Actors</h3>
            <p>{movie.Actors}</p>
          </div>
          <div className="detail-item">
            <h3>Awards</h3>
            <p>{movie.Awards}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
