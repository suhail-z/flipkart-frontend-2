"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
} from "@mui/material";
import { Search, ShoppingCart, AccountCircle } from "@mui/icons-material";
import "../styles.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = "/login";
    handleUserMenuClose();
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <AppBar position="sticky" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <Typography
          variant="h6"
          className="navbar-logo"
          onClick={() => navigate("/")}
        >
          Flipkart
        </Typography>

        <form onSubmit={handleSearch} className="navbar-search-form">
          <div className="navbar-search-container">
            <InputBase
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <IconButton type="submit" className="navbar-search-button">
              <Search />
            </IconButton>
          </div>
        </form>

        <div className="navbar-actions">
          <IconButton onClick={() => navigate("/cart")} className="navbar-icon">
            <Badge badgeContent={getCartItemCount()} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton onClick={handleUserMenuOpen} className="navbar-icon">
            <Avatar className="navbar-avatar">
              <AccountCircle />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                navigate("/cart");
                handleUserMenuClose();
              }}
            >
              Cart
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleUserMenuClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
