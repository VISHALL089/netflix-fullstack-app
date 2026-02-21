import React from 'react';
import './Row.css';

const Row = ({ title, movies, isLargeRow = false }) => {
    const base_url = "https://image.tmdb.org/t/p/original/";

    return (
        <div className="row">
            <h2 className="row-title">{title}</h2>
            <div className="row-posters">
                {movies?.map((movie) => (
                    <div key={movie.id} className="movie-card-container">
                        <img
                            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.title}
                        />
                        <div className="movie-hover-info">
                            <div className="hover-buttons">
                                <span className="play">▶</span>
                                <span className="add">+</span>
                                <span className="like">👍</span>
                            </div>
                            <p className="hover-title">{movie.title}</p>
                            <div className="hover-meta">
                                <span className="match">98% Match</span>
                                <span className="rating">{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Row;
