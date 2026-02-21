import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
      );
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <nav className="auth-nav">
        <h1 className="logo">NETFLIX</h1>
      </nav>
      <div className="auth-box">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <div className="auth-footer">
          <p>
            New to Netflix?{" "}
            <span onClick={() => navigate("/register")}>Sign up now</span>
          </p>
          <p className="recaptcha-text">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <span>Learn more.</span>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Login;
