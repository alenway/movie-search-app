import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { searchMovies, getMovieDetails } from './apiServie';

// Define TypeScript interfaces for our data
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);

  const handleSearch = async (searchTerm: string): Promise<void> => {
    if (searchTerm.trim() === '') return;
    setLoading(true);
    setError(null);
    setSelectedMovie(null);

    try {
      const data = await searchMovies(searchTerm);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'Unknown error occurred');
        setMovies([]);
      }
    } catch {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (imdbID: string): Promise<void> => {
    setLoading(true);

    try {
      const data = await getMovieDetails(imdbID);

      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError('Movie details not found');
      }
    } catch {
      setError('Failed to fetch movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          setMovies([]);
          setSelectedMovie(null);
          setError('');
          setLoading(false);
        }}>
          <h1>Movie Search App</h1>
        </a>
      </header>
      <main>
        <SearchBar onSelectMovie={handleSearch} />

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        )}
      </main>
    </div>
  );
}

export default App;
