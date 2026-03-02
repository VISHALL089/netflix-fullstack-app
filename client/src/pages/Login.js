import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/profiles");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
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
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <input
                type="email"
                placeholder="Email or phone number"
                className="auth-input"
                value={formData.email}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, email: e.target.value });
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
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </div>
            {error && <span className="auth-error-msg">{error}</span>}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <div className="auth-options">
              <div className="auth-options-group">
                <input type="checkbox" id="remember" defaultChecked />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span className="auth-options-link">Need help?</span>
            </div>
          </form>
          <div className="auth-footer">
            <p>
              New to Netflix?{" "}
              <span onClick={() => navigate("/register")}>Sign up now</span>.
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

export default Login;
