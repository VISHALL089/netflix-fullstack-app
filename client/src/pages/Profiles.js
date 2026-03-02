import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import './Profiles.css';

const Profiles = () => {
    const navigate = useNavigate();

    const selectProfile = () => {
        // Just route to home for the selected profile
        navigate('/home');
    };

    return (
        <div className="profiles-container animate-fade-in">
            <div className="profiles-nav">
                <h1 className="logo">NETFLIX</h1>
            </div>

            <div className="profiles-body">
                <h1 className="profiles-title">Who's watching?</h1>

                <div className="profiles-list">
                    <div className="profile-item" onClick={selectProfile}>
                        <div className="profile-avatar-wrapper">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                                alt="User 1"
                                className="profile-image"
                            />
                        </div>
                        <span className="profile-name">User</span>
                    </div>

                    <div className="profile-item" onClick={selectProfile}>
                        <div className="profile-avatar-wrapper">
                            <img
                                src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
                                alt="User 2"
                                className="profile-image"
                            />
                        </div>
                        <span className="profile-name">Guest</span>
                    </div>

                    <div className="profile-item" onClick={selectProfile}>
                        <div className="profile-avatar-wrapper">
                            <img
                                src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                                alt="User 3"
                                className="profile-image"
                            />
                        </div>
                        <span className="profile-name">Kids</span>
                    </div>

                    <div className="profile-item">
                        <div className="profile-avatar-wrapper add-profile-wrapper">
                            <Plus size={48} className="add-icon" />
                        </div>
                        <span className="profile-name">Add Profile</span>
                    </div>
                </div>

                <button className="manage-profiles-btn">
                    Manage Profiles
                </button>
            </div>
        </div>
    );
};

export default Profiles;
