import React, { useEffect } from 'react';
import { Play, Plus, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // prevent background scrolling

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!movie) return null;

    const base_url = "https://image.tmdb.org/t/p/original/";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </div>

                <div className="modal-banner">
                    <img
                        src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="modal-banner-img"
                    />
                    <div className="modal-banner-fadeBottom" />

                    <div className="modal-banner-content">
                        <h1 className="modal-title">
                            {movie.title || movie.name || movie.original_name}
                        </h1>
                        <div className="modal-banner-buttons">
                            <button className="modal-play-btn">
                                <Play fill="currentColor" size={24} /> Play
                            </button>
                            <button className="modal-icon-btn">
                                <Plus size={24} />
                            </button>
                            <button className="modal-icon-btn">
                                <ThumbsUp size={20} />
                            </button>
                            <button className="modal-icon-btn">
                                <ThumbsDown size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="modal-details-container">
                    <div className="modal-details-left">
                        <div className="modal-meta">
                            <span className="match">98% Match</span>
                            <span className="year">{new Date(movie.release_date || movie.first_air_date).getFullYear() || "2024"}</span>
                            <span className="age-rating">18+</span>
                            <span className="duration">2h 14m</span>
                            <span className="hd">HD</span>
                        </div>
                        <p className="modal-description">
                            {movie.overview}
                        </p>
                    </div>

                    <div className="modal-details-right">
                        <div className="modal-metadata-item">
                            <span className="metadata-label">Cast: </span>
                            <span className="metadata-value">Actor 1, Actor 2, Actor 3</span>
                        </div>
                        <div className="modal-metadata-item">
                            <span className="metadata-label">Genres: </span>
                            <span className="metadata-value">Action, Thriller, Drama</span>
                        </div>
                        <div className="modal-metadata-item">
                            <span className="metadata-label">This movie is: </span>
                            <span className="metadata-value">Gritty, Dark, Exciting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
