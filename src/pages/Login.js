// src/pages/Login.js
import React, { useState } from "react";
import { login } from "../services/authService"; // Make sure to import your service functions
import "./Login.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(""); // State for email in forgot password
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // Toggle for forgot password

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await login(username, password);
      console.log(response.data); // Handle success, redirect, etc.
      // Add your redirect logic here
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials."); // Set error message
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      //   await sendPasswordResetEmail(email); // Implement this function in your service
      alert("Reset link sent to your email."); // Alert for success
      setEmail(""); // Clear email input
      setForgotPasswordMode(false); // Close forgot password mode
    } catch (err) {
      console.error("Error sending reset email", err);
      setError("Failed to send reset link. Please try again."); // Set error message
    }
  };
  const handleCancel = () => {
    setForgotPasswordMode(false); // Close forgot password mode
    setEmail(""); // Clear email input
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div className="login-container">
      <img
        src="https://1000logos.net/wp-content/uploads/2018/03/SBI-Logo.png"
        alt="Logo"
        className="login-logo-top-left"
      />
      <img
        src="https://1000logos.net/wp-content/uploads/2018/03/SBI-Logo.png"
        alt="Logo"
        className="login-logo"
      />
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      {!forgotPasswordMode ? (
        <form onSubmit={handleLogin} className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="6 Digits Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <div className="forgot-password">
            <span
              onClick={() => setForgotPasswordMode(true)}
              className="forgot-password-link"
            >
              Forgot Password?
            </span>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword} className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Reset Link</button>
          <button
            // onClick={() => setForgotPasswordMode(false)}
            onClick={handleCancel}
            className="cancel-link"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
