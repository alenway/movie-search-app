import { Movie, MovieDetail } from './App';

const API_KEY = "4a3b711b"; // Free OMDB API key for development/demo purposes
const BASE_URL = "https://www.omdbapi.com";

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (searchTerm: string): Promise<SearchResponse> => {
  const response = await fetch(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetail> => {
  const response = await fetch(`${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
