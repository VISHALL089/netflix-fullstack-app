import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        formData
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <nav className="auth-nav">
        <h1 className="logo">NETFLIX</h1>
      </nav>
      <div className="auth-body">
        <div className="auth-box animate-scale-up">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <input
                type="text"
                placeholder="Full Name"
                className="auth-input"
                value={formData.name}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, name: e.target.value })
                }}
              />
            </div>
            <div className="auth-form-group">
              <input
                type="email"
                placeholder="Email address"
                className="auth-input"
                value={formData.email}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, email: e.target.value })
                }}
              />
            </div>
            <div className="auth-form-group">
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                value={formData.password}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, password: e.target.value })
                }}
              />
            </div>
            <div className="auth-form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                className="auth-input"
                value={formData.phone}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, phone: e.target.value })
                }}
              />
            </div>
            {error && <span className="auth-error-msg">{error}</span>}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Sign In</span>.
            </p>
            <p className="recaptcha-text">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <span>Learn more.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
