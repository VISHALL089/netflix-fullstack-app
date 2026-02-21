import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import "./Home.css";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [loading, setLoading] = useState(true);
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
      <div className="loading-screen">
        <div className="netflix-loader"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />
      <Banner movie={bannerMovie} />

      <div className="rows-container">
        <Row title="Trending Now" movies={trending} isLargeRow={true} />
        <Row title="Popular on Netflix" movies={popular} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Action Movies" movies={action} />
        <Row title="Comedy Movies" movies={comedy} />
      </div>

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
