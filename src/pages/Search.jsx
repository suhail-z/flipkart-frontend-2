"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { addToCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, query]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://flipkart-backend-fkju.onrender.com/products"
      );
      const data = await response.json();
      const productList = data.products || data.docs || data;
      setProducts(Array.isArray(productList) ? productList : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm)
    );

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(" Product added to cart!", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Typography variant="h6">Searching products...</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Typography variant="h5" className="font-bold">
            Search Results for "{query}"
          </Typography>
          <Typography variant="body1" className="text-gray-600 mt-1">
            {filteredProducts.length} products found
          </Typography>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Typography variant="h6" className="text-gray-500 mb-2">
              No products found
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              Try searching with different keywords
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Typography variant="body2" className="text-gray-500">
                        No Image
                      </Typography>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <Typography
                    variant="h6"
                    className="font-semibold mb-2 line-clamp-2"
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    className="text-gray-600 mb-2 line-clamp-2"
                  >
                    {product.description}
                  </Typography>

                  <div className="flex flex-wrap gap-1 mb-2">
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

                  <div className="flex items-center gap-2 mb-2">
                    <Typography
                      variant="h6"
                      className="font-bold text-green-600"
                    >
                      ₹{product.price}
                    </Typography>
                    {product.discountPercentage && (
                      <Typography variant="body2" className="text-green-600">
                        {product.discountPercentage}% off
                      </Typography>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Rating value={product.rating} readOnly size="small" />
                        <Typography variant="body2" className="text-gray-600">
                          ({product.rating})
                        </Typography>
                      </div>
                    )}
                    {product.stock && (
                      <Typography variant="body2" className="text-gray-600">
                        Stock: {product.stock}
                      </Typography>
                    )}
                  </div>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Add to Cart
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
