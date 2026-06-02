import React, { useEffect } from "react";
import ResObj from "../utils/mockdata";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING",
    );

    const json = await data.json();
    console.log(json);

    let restaurants = [];

    json?.data?.cards?.forEach((card) => {
      const res = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (res) {
        restaurants = [...restaurants, ...res]; 
      }
    });

    console.log("Total restaurants:", restaurants.length);

    setListOfRestaurant(restaurants);
  };
  return (
    <div className="body">
      <div className="search">
        <input
          type="text"
          id="menu_search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search restaurants, fast foods, dishes, desserts..."
        />
        <button id="btn" 
        onClick={()=>{
          const filteredRestaurant =  listOfRestaurant.filter((res) =>
            res.info.name.toLowerCase().includes(searchText.toLowerCase()),
          );
          setListOfRestaurant(filteredRestaurant);
        }}>Search</button>
      </div>

      <div >
        <button 
          onClick={() => {
            const filteredRestaurant = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4,
            );
            setListOfRestaurant(filteredRestaurant);
          }}
        >
          Filter Top Rated
        </button>
      </div>

      <div className="restaurants">
        {listOfRestaurant.length === 0 ? (
          <Shimmer />
        ) : (
          listOfRestaurant.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.info.id + "-" + index}
              ResData={restaurant}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
//api call=>useEffect=>fetch data from api=>update the state=>re-render the component
// react is fast because it have virtual dome (wat is reconciliation,array destructureing )
//microservice architecture=>divide the application into small services and each service is responsible for one thing and they communicate with each other through APIlike backend ,api,authentication, database all combines and make a big web application and each service is responsible for one thing and they communicate with each other through API
//whenenver state variable update ,react trigger a reconciloation cycle( re rendering )
//y react is faster