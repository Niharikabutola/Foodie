import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import RestaurantRecommendations from "../../components/RestaurantRecommendations/RestaurantRecommendations";

const Home = () => {

  const [category, setCategory] = useState('All');
  const [showButton, setShowButton] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
 

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToMenu");
    if (shouldScroll === "true") {
      const section = document.getElementById("explore-menu");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("scrollToMenu");
    }
  }, []);

  // Check if user is new (no previous orders or preferences)
  useEffect(() => {
    const hasOrdered = localStorage.getItem("hasOrdered");
    const hasPreferences = localStorage.getItem("userPreferences");
    
    if (!hasOrdered && !hasPreferences) {
      setShowRecommendations(true);
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      
      {/* Show recommendations for new users */}
      {showRecommendations && (
        <div className="recommendations-section">
          <div className="recommendations-banner">
            <h2>🎉 Welcome to Foodie!</h2>
            <p>Discover the best-rated restaurants in your area</p>
            <button 
              className="explore-recommendations-btn"
              onClick={() => setShowRecommendations(false)}
            >
              Explore Top Picks
            </button>
          </div>
          <RestaurantRecommendations />
        </div>
      )}
      
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
