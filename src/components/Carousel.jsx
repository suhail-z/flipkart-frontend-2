"use client";

import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "../styles.css";
const bannerImages = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1711134826547-169d7de16190?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Sale Banner 1",
  },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1714226832714-60eecbb6b080?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Electronics Banner",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Fashion Banner",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=1205&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Home Appliances Banner",
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      {/* Images */}
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((banner) => (
          <div key={banner.id} className="carousel-slide">
            <img
              src={banner.image}
              alt={banner.alt}
              className="carousel-image"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <IconButton onClick={prevSlide} className="carousel-arrow left">
        <ChevronLeft />
      </IconButton>

      <IconButton onClick={nextSlide} className="carousel-arrow right">
        <ChevronRight />
      </IconButton>

      {/* Dots */}
      <div className="carousel-dots">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
