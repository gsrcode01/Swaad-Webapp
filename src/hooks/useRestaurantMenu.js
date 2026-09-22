import { useState, useEffect } from "react";
import { MENU_API_URL } from "../utils/constants";
import mockRestaurants from "../utils/mockdata";

const generateFallbackMenu = (resId) => {
  const matchedRes = mockRestaurants.find((r) => r.info.id === resId)?.info || {
    name: "Sagar Ratna",
    cuisines: ["South Indian", "North Indian", "Chinese"],
    costForTwoMessage: "₹350 for two",
    avgRating: "4.5",
    sla: { slaString: "25–30 mins" },
  };

  return {
    cards: [
      {
        card: {
          card: {
            info: {
              id: resId,
              name: matchedRes.name,
              cuisines: matchedRes.cuisines,
              costForTwoMessage: matchedRes.costForTwoMessage || "₹350 for two",
              avgRating: matchedRes.avgRating || "4.5",
              totalRatingsString: "1.2K+ ratings",
              sla: matchedRes.sla || { slaString: "25–30 mins" },
              cloudinaryImageId: matchedRes.cloudinaryImageId,
            },
          },
        },
      },
      {},
      {},
      {},
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: [
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Recommended Specials",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: "m_101",
                              name: "Special Masala Dosa",
                              price: 14000,
                              description:
                                "Crispy golden fermented crepe stuffed with spiced potato masala, served with fresh coconut chutney and piping hot sambar.",
                              imageId: "vkhjhgmsnvclunanqnsv",
                              isVeg: 1,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "m_102",
                              name: "Paneer Butter Masala Bowl",
                              price: 26000,
                              description:
                                "Cottage cheese cubes tossed in rich velvety tomato gravy with cream, butter, and fragrant whole spices.",
                              imageId: "e0vvulfbahjxjv6kkovm",
                              isVeg: 1,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "m_103",
                              name: "Hyderabadi Dum Biryani",
                              price: 32000,
                              description:
                                "Slow cooked aromatic long-grain basmati rice with tender spices, caramelized onions, saffron, and fresh mint.",
                              imageId: "s5jhx3n7m3mivwngnv7n",
                              isVeg: 0,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Quick Bites & Starters",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: "m_104",
                              name: "Steamed Ghee Idli (2 Pcs)",
                              price: 8000,
                              description:
                                "Soft melt-in-mouth rice cakes topped with desi ghee and podi masala.",
                              imageId: "vkhjhgmsnvclunanqnsv",
                              isVeg: 1,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "m_105",
                              name: "Crispy Medu Vada (2 Pcs)",
                              price: 9000,
                              description:
                                "Crispy lentil fritters with peppercorns and curry leaves.",
                              imageId: "vkhjhgmsnvclunanqnsv",
                              isVeg: 1,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Beverages & Desserts",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: "m_106",
                              name: "Authentic Filter Coffee",
                              price: 5000,
                              description:
                                "Traditional South Indian frothy chicory filter coffee served piping hot.",
                              imageId: "vkhjhgmsnvclunanqnsv",
                              isVeg: 1,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "m_107",
                              name: "Hot Gulab Jamun (2 Pcs)",
                              price: 7000,
                              description:
                                "Fried milk solids soaked in cardamom rose flavored sugar syrup.",
                              imageId: "vkhjhgmsnvclunanqnsv",
                              isVeg: 1,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  };
};

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API_URL + resId);
      if (!data.ok) throw new Error("CORS or API Error");
      const json = await data.json();
      if (json?.data?.cards?.length > 0) {
        setResInfo(json.data);
      } else {
        setResInfo(generateFallbackMenu(resId));
      }
    } catch (err) {
      console.warn("Using structured fallback menu for restaurant:", resId);
      setResInfo(generateFallbackMenu(resId));
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
