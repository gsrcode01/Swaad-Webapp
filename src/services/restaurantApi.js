import { get } from "./apiClient";

export const fetchRestaurantList = async (query = "") => {
  try {
    const endpoint = query ? `/restaurants?q=${encodeURIComponent(query)}` : "/restaurants";
    const data = await get(endpoint);
    return data?.restaurants || [];
  } catch (error) {
    console.warn("fetchRestaurantList fallback:", error.message);
    return [];
  }
};

export const fetchRestaurantMenu = async (resId) => {
  try {
    const data = await get(`/restaurants/${resId}/menu`);
    return data || null;
  } catch (error) {
    console.warn("fetchRestaurantMenu fallback:", error.message);
    return null;
  }
};

export const searchMenuDishes = async (resId, query = "") => {
  try {
    const data = await get(`/menu/search?restaurantId=${resId}&q=${encodeURIComponent(query)}`);
    return data?.dishes || [];
  } catch (error) {
    console.warn("searchMenuDishes fallback:", error.message);
    return [];
  }
};
