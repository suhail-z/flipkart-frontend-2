"use client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2874f0",
    },
    secondary: {
      main: "#fb641b",
    },
  },
});

// Enhanced Auth protection component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking, true/false = result
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      // Optional: Add token validation logic here
      // For now, we'll assume any token is valid
      // In a real app, you might want to verify the token with the backend
      try {
        // Basic token format check (you can enhance this)
        if (token.length > 10) {
          // Simple check
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      // Store the attempted URL to redirect back after login
      localStorage.setItem(
        "redirectAfterLogin",
        location.pathname + location.search
      );
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

// Layout component for pages that need navbar
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

// Auth redirect component for login/signup pages
const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  // inside component
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes - redirect to home if already authenticated */}
            <Route
              path="/login"
              element={
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRedirect>
                  <Signup />
                </AuthRedirect>
              }
            />

            {/* Protected routes - require authentication */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Homepage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Cart />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Search />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to home if authenticated, login if not */}
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
