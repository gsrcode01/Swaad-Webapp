import { useState, useEffect } from "react";
import { MENU_API_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API_URL + resId);
      const json = await data.json();
      setResInfo(json?.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
