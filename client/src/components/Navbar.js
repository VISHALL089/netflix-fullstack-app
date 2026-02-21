import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-left">
                <h1 className="logo" onClick={() => navigate('/home')}>NETFLIX</h1>
                <ul className="nav-links">
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                </ul>
            </div>
            <div className="navbar-right">
                <div className="search-icon">🔍</div>
                <div className="notifications">🔔</div>
                <div className="profile-container">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Profile"
                        className="profile-avatar"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
