import { useEffect, useState } from "react";
import Shimmer from "./shimmer";

const RestaurantMenu = () => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();

      console.log(json);

      setMenuData(json);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  if (menuData === null) {
    return <Shimmer />;
  }

  const restaurants =
    menuData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;

  return (
    <div className="res-menu">
      <h1>Restaurants</h1>

      <ul>
        {restaurants?.map((restaurant) => (
          <li key={restaurant?.info?.id}>
            <h3>{restaurant?.info?.name}</h3>

            <p>
              {restaurant?.info?.cuisines.join(", ")}
            </p>

            <p>
              ⭐ {restaurant?.info?.avgRating}
            </p>

            <p>
              {restaurant?.info?.costForTwo}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;