import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Heart, ThumbsUp, ChevronDown } from 'lucide-react';
import { useList } from '../context/ListContext';
import './Row.css';

const Row = ({ title, movies, isLargeRow = false, onMovieClick }) => {
    const rowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const { toggleFromList, isInList } = useList();
    const base_url = "https://image.tmdb.org/t/p/w500/";

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth + 100
                : scrollLeft + clientWidth - 100;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div
            className="row"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="row-title">{title}</h2>

            <div className="row-container">
                {isHovered && (
                    <div
                        className="slider-arrow slider-arrow-left"
                        onClick={() => handleScroll('left')}
                    >
                        <ChevronLeft size={40} />
                    </div>
                )}

                <div className="row-posters" ref={rowRef}>
                    {movies?.map((movie) => (
                        (movie.poster_path || movie.backdrop_path) && (
                            <div
                                key={movie.id}
                                className={`movie-card-container ${isLargeRow ? 'large' : ''}`}
                            >
                                <div className="movie-card" onClick={() => onMovieClick && onMovieClick(movie)}>
                                    <div className="movie-poster-wrapper">
                                        <img
                                            className={`row-poster ${isLargeRow ? "row-posterLarge" : ""}`}
                                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                            alt={movie.name || movie.title}
                                            loading="lazy"
                                        />
                                        <div className="movie-hover-info">
                                            <div className="hover-image-container">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path || movie.poster_path}`}
                                                    alt="hover-backdrop"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="hover-details">
                                                <div className="hover-buttons">
                                                    <div className="hover-buttons-left">
                                                        <button className="play-btn"><Play fill="currentColor" size={16} /></button>
                                                        <button
                                                            className={`icon-btn heart-btn ${isInList(movie.id) ? 'in-list' : ''}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleFromList(movie);
                                                            }}
                                                        >
                                                            <Heart fill={isInList(movie.id) ? "var(--netflix-red)" : "none"} size={16} color={isInList(movie.id) ? "var(--netflix-red)" : "currentColor"} />
                                                        </button>
                                                        <button className="icon-btn"><ThumbsUp size={14} /></button>
                                                    </div>
                                                    <div className="hover-buttons-right">
                                                        <button className="icon-btn" onClick={(e) => {
                                                            e.stopPropagation();
                                                            onMovieClick && onMovieClick(movie);
                                                        }}><ChevronDown size={16} /></button>
                                                    </div>
                                                </div>
                                                <div className="hover-meta">
                                                    <span className="match">98% Match</span>
                                                    <span className="rating-box">18+</span>
                                                    <span className="duration">2h 14m</span>
                                                    <span className="hd">HD</span>
                                                </div>
                                                <div className="hover-genres">
                                                    <span>Slick</span> • <span>Action</span> • <span>Thriller</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="movie-title-below">{movie.title || movie.name || movie.original_name}</h3>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {isHovered && (
                    <div
                        className="slider-arrow slider-arrow-right"
                        onClick={() => handleScroll('right')}
                    >
                        <ChevronRight size={40} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Row;
