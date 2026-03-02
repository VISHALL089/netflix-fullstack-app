import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import RowSkeleton from "../components/RowSkeleton";
import MovieModal from "../components/MovieModal";
import ScrollToTop from "../components/ScrollToTop";
import { useList } from "../context/ListContext";
import "./Home.css";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { myList } = useList();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAllMovies = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const baseUrl = process.env.REACT_APP_API_URL;

        // Fetch all categories in parallel from YOUR API
        const [trendingRes, popularRes, topRatedRes, actionRes, comedyRes] = await Promise.all([
          axios.get(`${baseUrl}/movies/trending`, { headers }),
          axios.get(`${baseUrl}/movies/popular`, { headers }),
          axios.get(`${baseUrl}/movies/top-rated`, { headers }),
          axios.get(`${baseUrl}/movies/action`, { headers }),
          axios.get(`${baseUrl}/movies/comedy`, { headers })
        ]);

        setTrending(trendingRes.data);
        setPopular(popularRes.data);
        setTopRated(topRatedRes.data);
        setAction(actionRes.data);
        setComedy(comedyRes.data);

        // Set a random trending movie for the banner
        if (trendingRes.data.length > 0) {
          setBannerMovie(
            trendingRes.data[Math.floor(Math.random() * trendingRes.data.length)]
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching from API:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [navigate]);

  if (loading) {
    return (
      <div className="home" style={{ overflow: 'hidden' }}>
        <Navbar />
        <div style={{ height: '80vh', background: '#111', width: '100%', marginBottom: '20px', animation: 'pulse 1.5s infinite ease-in-out' }}></div>
        <div className="rows-container">
          <RowSkeleton title="Trending Now" isLargeRow={true} />
          <RowSkeleton title="Popular on Netflix" />
          <RowSkeleton title="Top Rated" />
        </div>
      </div>
    );
  }

  return (
    <div className="home animate-fade-in">
      <Navbar />
      <Banner movie={bannerMovie} />

      <div className="rows-container">
        {myList && myList.length > 0 && (
          <Row title="My List" movies={myList} onMovieClick={setSelectedMovie} />
        )}
        <Row title="Trending Now" movies={trending} isLargeRow={true} onMovieClick={setSelectedMovie} />
        <Row title="Popular on Netflix" movies={popular} onMovieClick={setSelectedMovie} />
        <Row title="Top Rated" movies={topRated} onMovieClick={setSelectedMovie} />
        <Row title="Action Movies" movies={action} onMovieClick={setSelectedMovie} />
        <Row title="Comedy Movies" movies={comedy} onMovieClick={setSelectedMovie} />
      </div>

      <ScrollToTop />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <footer className="footer">
        <div className="footer-links">
          <span>Audio and Subtitles</span>
          <span>Audio Description</span>
          <span>Help Center</span>
          <span>Gift Cards</span>
          <span>Media Center</span>
          <span>Investor Relations</span>
          <span>Jobs</span>
          <span>Terms of Use</span>
          <span>Privacy</span>
          <span>Legal Notices</span>
          <span>Cookie Preferences</span>
          <span>Corporate Information</span>
          <span>Contact Us</span>
        </div>
        <button className="service-code">Service Code</button>
        <p className="copyright">© 1997-2026 Netflix, Inc.</p>
      </footer>
    </div>
  );
};

export default Home;
