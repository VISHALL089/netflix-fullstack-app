import React from 'react';
import './Banner.css';

const Banner = ({ movie }) => {
    if (!movie) return null;

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 0.9)), url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className="banner-contents">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner-buttons">
                    <button className="banner-button play-button">▶  Play</button>
                    <button className="banner-button info-button">ⓘ  More Info</button>
                </div>
                <h1 className="banner-description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner-fadeBottom" />
        </header>
    );
};

export default Banner;
