import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchQuery = "" }) => {
  const { food_list } = useContext(StoreContext);

  // Filter food items by category and search query
  const filteredFoodList = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>
        {searchQuery 
          ? `Search Results for "${searchQuery}"` 
          : "Top Dishes Near You"
        }
      </h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No food items found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
