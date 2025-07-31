"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Carousel from "../components/Carousel";
import "../styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://flipkart-backend-fkju.onrender.com/products"
      );
      const data = await res.json();
      setProducts((existing) => {
        return Array.isArray(data) ? data : [];
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      console.warn("No userId found in localStorage.");
    }
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to Cart", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Typography variant="h6">Loading products...</Typography>
      </div>
    );
  }

  return (
    <div className="homepage-wrapper">
      <Carousel />

      <div className="homepage-container">
        <Typography variant="h5" className="heading">
          All Products
        </Typography>

        {products.length === 0 ? (
          <Typography variant="body1" className="no-products-text">
            No products available
          </Typography>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <Card key={product._id} className="product-card">
                <div className="product-thumbnail">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      className="product-image"
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      <Typography variant="body2" className="no-image-text">
                        No Image
                      </Typography>
                    </div>
                  )}
                </div>

                <CardContent className="product-content">
                  <div className="product-description-box">
                    <div className="product-content-filler">
                      <Typography variant="h6" className="product-title">
                        {product.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        className="product-description line-clamp-2"
                      >
                        {product.description}
                      </Typography>

                      <div className="product-chips">
                        {product.brand && (
                          <Chip
                            label={product.brand}
                            size="small"
                            variant="outlined"
                          />
                        )}
                        {product.category && (
                          <Chip
                            label={product.category}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </div>
                    </div>

                    <div className="product-price-section">
                      <Typography variant="h6" className="product-price">
                        ₹{product.price}
                      </Typography>
                      {product.discountPercentage && (
                        <Typography
                          variant="body2"
                          className="product-discount"
                        >
                          {product.discountPercentage}% off
                        </Typography>
                      )}
                    </div>

                    <div className="product-info-section">
                      {product.rating && (
                        <div className="product-rating">
                          <Rating
                            value={product.rating}
                            readOnly
                            size="small"
                          />
                          <Typography
                            variant="body2"
                            className="product-rating-text"
                          >
                            ({product.rating})
                          </Typography>
                        </div>
                      )}
                      {product.stock && (
                        <Typography variant="body2" className="product-stock">
                          Stock: {product.stock}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCartHandler(product)}
                    className="add-to-cart-btn"
                    disabled={product.deleted}
                  >
                    {product.deleted ? "Currently Unavailable" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
