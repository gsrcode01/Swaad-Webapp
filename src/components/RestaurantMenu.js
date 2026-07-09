import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import ResObj from "../utils/mockdata";
import { IMG_CDN_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`
      );

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const json = await res.json();

      // Extract restaurant info
      const info = json?.data?.cards?.find(
        (x) => x?.card?.card?.info
      )?.card?.card?.info;

      if (!info) {
        throw new Error("Restaurant info not found in API response");
      }

      setRestaurantInfo(info);

      // Extract categories having itemCards
      const menuCards = json?.data?.cards?.find(
        (x) => x?.groupedCard
      )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const extractedCategories = menuCards
        ?.map((c) => c?.card?.card)
        ?.filter(
          (c) =>
            c?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
            c?.itemCards
        );

      setCategories(extractedCategories || []);
      setLoading(false);
    } catch (error) {
      console.warn("Error fetching restaurant menu, using mock fallback:", error);
      
      // Fallback: Find the restaurant in mockdata
      const mockRes = ResObj.find((r) => r?.info?.id === id);
      if (mockRes) {
        setRestaurantInfo(mockRes.info);
        
        // Generate mock dishes based on cuisines
        const cuisines = mockRes.info.cuisines || [];
        const mockDishes = [];
        
        if (cuisines.some(c => c.includes("Pizza"))) {
          mockDishes.push(
            { id: "m1", name: "Margherita Pizza", price: 29900, description: "Classic cheese and tomato pizza with fresh basil." },
            { id: "m2", name: "Pepperoni Pizza", price: 39900, description: "Loaded with spicy pepperoni slices and mozzarella." },
            { id: "m3", name: "Veggie Supreme Pizza", price: 34900, description: "Loaded with onion, capsicum, tomato, mushroom, and olives." }
          );
        }
        if (cuisines.some(c => c.includes("Burger") || c.includes("Fast Food"))) {
          mockDishes.push(
            { id: "m4", name: "Veggie Crunch Burger", price: 14900, description: "Crispy veg patty with fresh lettuce, tomato, and creamy mayo." },
            { id: "m5", name: "Spicy Chicken Burger", price: 18900, description: "Zesty chicken patty with jalapenos, onions, and spicy dressing." },
            { id: "m6", name: "French Fries", price: 9900, description: "Golden, crispy, perfectly salted signature fries." }
          );
        }
        if (cuisines.some(c => c.includes("Biryani") || c.includes("Hyderabadi") || c.includes("Mughlai"))) {
          mockDishes.push(
            { id: "m7", name: "Special Chicken Biryani", price: 24900, description: "Authentic cooked basmati rice with aromatic spices and chicken pieces." },
            { id: "m8", name: "Paneer Tikka Biryani", price: 22900, description: "Fragrant rice cooked with soft, grilled paneer tikka cubes." }
          );
        }
        
        // Fallback list of generic delicious dishes if cuisines didn't match the specific conditions
        if (mockDishes.length === 0) {
          mockDishes.push(
            { id: "m9", name: "Special Fried Rice", price: 19900, description: "Stir-fried rice with choice of fresh vegetables and light soy sauce." },
            { id: "m10", name: "Hot & Sour Soup", price: 12900, description: "Classic hot and sour oriental soup with tofu and mushrooms." },
            { id: "m11", name: "Chocolate Brownie", price: 8900, description: "Rich, fudgy chocolate brownie served warm with chocolate sauce." }
          );
        }
        
        setCategories([
          {
            title: "Recommended",
            itemCards: mockDishes.map((dish) => ({ card: { info: dish } })),
          },
        ]);
      } else {
        // Ultimate fallback
        setRestaurantInfo({
          name: "Eatery & Kitchen",
          cuisines: ["Continental", "Fast Food"],
          costForTwoMessage: "₹300 for two",
          avgRating: "4.1",
          locality: "Main Road",
          areaName: "Downtown",
        });
        setCategories([
          {
            title: "Recommended",
            itemCards: [
              { card: { info: { id: "d1", name: "Signature Burger", price: 16900, description: "House special burger with crispy patty and cheese." } } },
              { card: { info: { id: "d2", name: "Garlic Bread Sticks", price: 11900, description: "Baked garlic bread served with cheese dip." } } },
            ],
          },
        ]);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage, costForTwo, avgRating, locality, areaName } = restaurantInfo || {};

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="menu-header-details">
          <h1>{name}</h1>
          <p className="menu-cuisines">{cuisines?.join(", ")}</p>
          <p className="menu-location">
            {locality}, {areaName}
          </p>
        </div>
        <div className="menu-header-meta">
          <div className="menu-rating">⭐ {avgRating}</div>
          <div className="menu-cost">{costForTwoMessage || costForTwo}</div>
        </div>
      </div>

      <div className="menu-sections">
        {categories.map((category, idx) => (
          <div key={idx} className="menu-category">
            <h2 className="menu-category-title">
              {category.title} ({category.itemCards?.length})
            </h2>
            <div className="menu-items-list">
              {category.itemCards?.map((item) => {
                const dish = item?.card?.info;
                if (!dish) return null;
                return (
                  <div key={dish.id} className="menu-item-card">
                    <div className="menu-item-info">
                      <h3 className="menu-item-name">{dish.name}</h3>
                      <p className="menu-item-price">
                        ₹{dish.price ? dish.price / 100 : dish.defaultPrice / 100}
                      </p>
                      <p className="menu-item-desc">{dish.description}</p>
                    </div>
                    {dish.imageId && (
                      <div className="menu-item-img-container">
                        <img
                          src={IMG_CDN_URL + dish.imageId}
                          alt={dish.name}
                          className="menu-item-img"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
