import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import './Banner.css';

const Banner = ({ movie }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (movie) {
            setAnimate(true);
        }
    }, [movie]);

    if (!movie) return (
        <header className="banner banner-skeleton">
            <div className="banner-contents"></div>
        </header>
    );

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center top",
            }}
        >
            <div className="banner-vignette"></div>

            <div className={`banner-contents ${animate ? 'animate-slide-up' : ''}`}>
                <div className="banner-tag">N E T F L I X   O R I G I N A L</div>
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner-metadata">
                    <span className="match">98% Match</span>
                    <span className="year">{new Date(movie?.release_date || movie?.first_air_date).getFullYear() || "2024"}</span>
                    <span className="age-rating">18+</span>
                    <span className="duration">2h 14m</span>
                    <span className="hd">HD</span>
                </div>

                <h1 className="banner-description">
                    {truncate(movie?.overview, 180)}
                </h1>

                <div className="banner-buttons">
                    <button className="banner-button play-button">
                        <Play fill="currentColor" size={24} /> <span>Play</span>
                    </button>
                    <button className="banner-button info-button">
                        <Info size={24} /> <span>More Info</span>
                    </button>
                </div>
            </div>

            <div className="banner-right-controls">
                <button
                    className="banner-volume"
                    onClick={() => setIsMuted(!isMuted)}
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <div className="banner-age-rating-box">18+</div>
            </div>

            <div className="banner-fadeBottom" />
        </header>
    );
};

export default Banner;
