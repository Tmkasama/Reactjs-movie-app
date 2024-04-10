import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=fa1192549721df01a1fb28a7788e6608";
  const API_SEARCH =
    "https://api.themoviedb.org/3/search/movie?api_key=fa1192549721df01a1fb28a7788e6608&query=";

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));

    const genreURL =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=fa1192549721df01a1fb28a7788e6608";
    fetch(genreURL)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(API_SEARCH + term)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };

  const handleGenreClick = (genreId) => {
    const genreMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=fa1192549721df01a1fb28a7788e6608&with_genres=${genreId}`;
    fetch(genreMoviesURL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));

    setSelectedGenre(genreId);
  };

  const resetGenre = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
    setSelectedGenre(null);
  };

  return (
    <div className="App">
      <div className="search_nav">
        <div className="title">
          <a href="index.html">Movies</a>
        </div>
        <div className="search_box">
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setTerm(e.target.value)} />
            <button>Search</button>
          </form>
        </div>
      </div>

      <div className="genres">
        <button onClick={resetGenre}>All Genres</button>
        {genres
          .filter((genre) => genre.name !== "Western")
          .map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={selectedGenre === genre.id ? "active" : ""}
            >
              {genre.name}
            </button>
          ))}
      </div>

      <div className="movies">
        {selectedGenre === null
          ? movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
          : movies
              .filter((movie) => movie.genre_ids.includes(selectedGenre))
              .map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default App;
