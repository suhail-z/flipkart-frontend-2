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
import "../styles.css";

export default function Signup() {
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
        "https://flipkart-backend-1-pjtm.onrender.com/auth/signup",
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
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Container maxWidth="sm">
        <Paper elevation={3} className="signup-container">
          <Box className="signup-header">
            <Typography variant="h4" className="signup-title">
              Flipkart
            </Typography>
            <Typography variant="h6" className="signup-subtitle">
              Create your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="signup-error">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
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
              className="signup-button"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="signup-footer">
            <Typography variant="body2" className="signup-footer-text">
              Already have an account?{" "}
              <Link to="/login" className="signup-footer-link">
                Login here
              </Link>
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
