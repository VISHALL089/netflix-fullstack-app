import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Play, Plus, ThumbsUp, Heart, ChevronDown } from 'lucide-react';
import Navbar from "../components/Navbar";
import MovieModal from "../components/MovieModal";
import ScrollToTop from "../components/ScrollToTop";
import { useList } from "../context/ListContext";
import "./Search.css";
import "../components/Row.css"; // Reuse card hover styling
import "../components/RowSkeleton.css"; // Reuse skeleton classes

const Search = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { toggleFromList, isInList } = useList();
    const base_url = "https://image.tmdb.org/t/p/w500/";

    const query = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const searchMovies = async () => {
            setLoading(true);
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const baseUrl = process.env.REACT_APP_API_URL;

                // Fetch from multiple to build a large local pool since backend has no search
                const [p1, p2, p3, p4] = await Promise.all([
                    axios.get(`${baseUrl}/movies/trending`, { headers }),
                    axios.get(`${baseUrl}/movies/popular`, { headers }),
                    axios.get(`${baseUrl}/movies/action`, { headers }),
                    axios.get(`${baseUrl}/movies/comedy`, { headers })
                ]);

                // Combine and remove duplicates
                const allMoviesMap = new Map();
                [...p1.data, ...p2.data, ...p3.data, ...p4.data].forEach(m => {
                    allMoviesMap.set(m.id, m);
                });

                const allMovies = Array.from(allMoviesMap.values());
                const lowerQuery = query.toLowerCase();

                const filtered = allMovies.filter(m =>
                    (m.title && m.title.toLowerCase().includes(lowerQuery)) ||
                    (m.name && m.name.toLowerCase().includes(lowerQuery)) ||
                    (m.original_name && m.original_name.toLowerCase().includes(lowerQuery))
                );

                setResults(filtered);
                setLoading(false);
            } catch (error) {
                console.error("Search error:", error);
                setLoading(false);
            }
        };

        if (query) {
            searchMovies();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [query, navigate]);

    return (
        <div className="search-page">
            <Navbar />

            <div className="search-content">
                <h2 className="search-title">
                    Search results for "{query}"
                </h2>

                {loading ? (
                    <div className="search-grid">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="movie-card-container large skeleton-card" style={{ pointerEvents: 'none' }}>
                                <div className="skeleton-poster row-posterLarge"></div>
                                <div className="skeleton-title-below"></div>
                            </div>
                        ))}
                    </div>
                ) : results.length > 0 ? (
                    <div className="search-grid">
                        {results.map((movie) => (
                            (movie.poster_path || movie.backdrop_path) && (
                                <div
                                    key={movie.id}
                                    className="movie-card-container large"
                                >
                                    <div className="movie-card" onClick={() => setSelectedMovie(movie)}>
                                        <div className="movie-poster-wrapper">
                                            <img
                                                className="row-poster row-posterLarge"
                                                src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
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
                                                                setSelectedMovie(movie);
                                                            }}><ChevronDown size={16} /></button>
                                                        </div>
                                                    </div>
                                                    <div className="hover-meta">
                                                        <span className="match">98% Match</span>
                                                        <span className="rating-box">18+</span>
                                                        <span className="duration">Movies</span>
                                                        <span className="hd">HD</span>
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
                ) : (
                    <div className="search-empty">
                        <div className="empty-state-illustration">🔍</div>
                        <h3>No results found for "{query}"</h3>
                        <p>Suggestions: Try different keywords, movies, or genres.</p>
                    </div>
                )}
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            <ScrollToTop />
        </div>
    );
};

export default Search;
