import React, { useEffect, useState } from "react";
import ResObj from "../../utils/mockdata";
import RestaurantCard, {
  withPromotedLabel,
} from "../../components/RestaurantCard/RestaurantCard";
import Shimmer from "../../components/Shimmer/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../hooks/useOnlineStatus";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) throw new Error(`API returned status ${data.status}`);

      const json = await data.json();
      let restaurants = [];

      json?.data?.cards?.forEach((card) => {
        const res = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (res) restaurants = [...restaurants, ...res];
      });

      if (restaurants.length === 0) throw new Error("No restaurants found");

      setListOfRestaurant(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.warn("Fetch failed, using mock data:", error);
      setListOfRestaurant(ResObj);
      setFilteredRestaurant(ResObj);
    }
  };

  if (onlineStatus === false) {
    return (
      <h1 className="text-center text-2xl font-bold text-red-600 mt-20">
        You are offline! Please check your internet connection. 🔴
      </h1>
    );
  }

  return (
    <div className="body">
      <div className="filter flex items-center gap-4 m-4 p-4">
        <div className="search flex items-center gap-2">
          <input
            type="text"
            className="border border-solid border-black rounded-lg px-4 py-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search restaurants..."
          />
          <button
            className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 cursor-pointer"
            onClick={() => {
              const filtered = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            const topRated = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(topRated);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="flex flex-wrap">
        {listOfRestaurant.length === 0 ? (
          <Shimmer />
        ) : (
          filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              className="no-underline text-inherit"
            >
              {restaurant?.info?.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
