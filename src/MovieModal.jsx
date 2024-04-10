import React from "react";
import "./MovieModal.css";

const MovieModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay_background" onClick={onClose}>
      <div className="overlay_container">
        <div className="overlay_controls">
          <button className="overlay_close" onClick={onClose}>
            Close
          </button>
        </div>
        <iframe
          title="Movie Trailer"
          width="100%"
          height="100%"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieModal;
