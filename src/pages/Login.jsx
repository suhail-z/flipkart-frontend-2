"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import "../styles.css"; // import the custom stylesheet

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://flipkart-backend-fkju.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <Container maxWidth="sm">
        <Paper elevation={3} className="login-paper">
          <Box className="login-header">
            <Typography variant="h4" className="login-title">
              Flipkart
            </Typography>
            <Typography variant="h6" className="login-subtitle">
              Login to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="login-alert">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              className="login-button"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="login-footer">
            <Typography variant="body2" className="login-footer-text">
              Don't have an account?{" "}
              <Link to="/signup" className="login-link">
                Sign up here
              </Link>
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
