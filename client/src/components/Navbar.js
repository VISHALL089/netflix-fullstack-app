import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                if (!searchQuery && location.pathname !== '/search') {
                    setIsSearchOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchQuery, location.pathname]);

    useEffect(() => {
        if (location.pathname === '/search') {
            const query = new URLSearchParams(location.search).get('q');
            if (query) {
                setSearchQuery(query);
                setIsSearchOpen(true);
            }
        } else {
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    }, [location.pathname, location.search]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-left">
                <Menu className="mobile-menu-icon" onClick={() => setIsMenuOpen(true)} />
                <h1 className="logo" onClick={() => navigate('/home')}>NETFLIX</h1>
                <ul className="nav-links">
                    <li className="active">Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                </ul>
            </div>

            <div className="navbar-right">
                <div
                    className={`search-box ${isSearchOpen ? 'search-open' : ''}`}
                    ref={searchRef}
                >
                    <Search
                        className="search-icon"
                        onClick={() => setIsSearchOpen(true)}
                    />
                    <input
                        type="text"
                        placeholder="Titles, people, genres"
                        value={searchQuery}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSearchQuery(val);
                            if (val.length > 0) {
                                navigate(`/search?q=${val}`);
                            } else {
                                navigate('/home');
                            }
                        }}
                        className="search-input"
                    />
                </div>

                <Bell className="nav-icon hidden-mobile" />

                <div
                    className="profile-container"
                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                    <div className="profile-trigger">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="Profile"
                            className="profile-avatar"
                        />
                        <ChevronDown className={`profile-caret ${isProfileDropdownOpen ? 'rotated' : ''}`} />
                    </div>
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown animate-fade-in">
                            <div className="dropdown-arrow"></div>
                            <div className="dropdown-item">Manage Profiles</div>
                            <div className="dropdown-item">Account</div>
                            <div className="dropdown-item">Help Center</div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item" onClick={handleLogout}>Sign out of Netflix</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-close">
                    <X onClick={() => setIsMenuOpen(false)} />
                </div>
                <div className="sidebar-user">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Profile"
                    />
                    <span>User</span>
                </div>
                <ul className="sidebar-links">
                    <li onClick={() => setIsMenuOpen(false)}>Home</li>
                    <li onClick={() => setIsMenuOpen(false)}>TV Shows</li>
                    <li onClick={() => setIsMenuOpen(false)}>Movies</li>
                    <li onClick={() => setIsMenuOpen(false)}>New & Popular</li>
                    <li onClick={() => setIsMenuOpen(false)}>My List</li>
                </ul>
                <div className="sidebar-footer" onClick={handleLogout}>
                    Sign out of Netflix
                </div>
            </div>
            {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;
