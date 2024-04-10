import React, { useState, useEffect } from "react";
import "./MovieCard.css";
import MovieModal from "./MovieModal";

const MovieCard = (props) => {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handlePosterClick = async () => {
    const movieTrailerUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    setTrailerUrl(movieTrailerUrl);

    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!props.poster_path) {
    return null;
  }

  return (
    <div className="card" onClick={handlePosterClick}>
      <div className="poster">
        <img src={API_IMG + props.poster_path} alt={props.title} />
      </div>
      <div className="info">
        <p className="title">{props.title}</p>
        <p className="vote">{props.vote_average}</p>
      </div>

      <div className="overview">
        <h2 className="title_overview">Overview:</h2>
        <h3 className="overview_info">{props.overview}</h3>
      </div>

      <MovieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl={trailerUrl}
      />
    </div>
  );
};

export default MovieCard;
