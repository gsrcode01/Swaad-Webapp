const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const SWIGGY_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
};

const CDN_BASE =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

// Fallback Mock Dataset
const MOCK_RESTAURANTS = [
  {
    id: "101",
    name: "Sagar Ratna",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80",
    rating: 4.5,
    cuisines: ["South Indian", "North Indian", "Chinese"],
    deliveryTime: 25,
    costForTwo: "₹250 for two",
    areaName: "Indiranagar",
    isPromoted: true,
  },
  {
    id: "102",
    name: "The Biryani House",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
    rating: 4.6,
    cuisines: ["Biryani", "Mughlai", "Kebabs"],
    deliveryTime: 30,
    costForTwo: "₹450 for two",
    areaName: "Koramangala",
    isPromoted: false,
  },
  {
    id: "103",
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
    rating: 4.3,
    cuisines: ["Pizzas", "Fast Food", "Pastas"],
    deliveryTime: 28,
    costForTwo: "₹400 for two",
    areaName: "HSR Layout",
    isPromoted: false,
  },
  {
    id: "104",
    name: "KFC",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    rating: 4.2,
    cuisines: ["Burgers", "Fast Food", "Rolls"],
    deliveryTime: 22,
    costForTwo: "₹350 for two",
    areaName: "Indiranagar",
    isPromoted: true,
  },
  {
    id: "105",
    name: "Mainland China",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
    rating: 4.7,
    cuisines: ["Chinese", "Asian", "Dim Sum"],
    deliveryTime: 35,
    costForTwo: "₹650 for two",
    areaName: "Lavelle Road",
    isPromoted: false,
  },
  {
    id: "106",
    name: "Sweet Truth — Cake and Desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    cuisines: ["Desserts", "Bakery", "Ice Cream"],
    deliveryTime: 20,
    costForTwo: "₹200 for two",
    areaName: "Bellandur",
    isPromoted: false,
  },
];

// In-Memory Global Restaurant Cache
const restaurantCache = new Map();

// Populate initial mock data
MOCK_RESTAURANTS.forEach((r) => restaurantCache.set(String(r.id), r));

// Helper: Normalize raw Swiggy Restaurant Card
const normalizeRestaurant = (card) => {
  const info = card?.info || card;
  const imageId = info.cloudinaryImageId;
  const image = imageId
    ? imageId.startsWith("http")
      ? imageId
      : `${CDN_BASE}${imageId}`
    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80";

  return {
    id: String(info.id || ""),
    name: info.name || "Restaurant",
    image,
    rating: parseFloat(info.avgRating || info.rating || 4.2),
    cuisines: info.cuisines || ["Multi-Cuisine"],
    deliveryTime: parseInt(info.sla?.deliveryTime || info.sla?.slaString || 25),
    costForTwo: info.costForTwo || info.costForTwoMessage || "₹350 for two",
    areaName: info.locality || info.areaName || "Bengaluru",
    isPromoted: Boolean(info.promoted),
  };
};

// Helper: Generate restaurant-specific custom menu
const generateRestaurantMenu = (restaurant) => {
  const { name, cuisines = [] } = restaurant;
  const cuisinesLower = cuisines.map((c) => c.toLowerCase()).join(" ");
  const nameLower = name.toLowerCase();

  // 1. Pizza Category
  if (cuisinesLower.includes("pizza") || nameLower.includes("pizza")) {
    return [
      {
        title: "Signature Pizzas",
        items: [
          {
            id: `${restaurant.id}_1`,
            name: "Farmhouse Loaded Cheese Pizza",
            price: 349,
            description: "Delightful combination of onion, capsicum, tomato, and grilled mushroom with 100% mozzarella cheese.",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
          },
          {
            id: `${restaurant.id}_2`,
            name: "Spicy Paneer Tikka Pizza",
            price: 399,
            description: "Tandoori spiced paneer cubes, red paprika, and crunchy bell peppers on crisp golden crust.",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
          },
          {
            id: `${restaurant.id}_3`,
            name: "Fiery Pepperoni & Chicken Feast",
            price: 449,
            description: "Smoked chicken sausage, peri peri chicken chunks, and grilled jalapenos.",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            rating: 4.6,
          },
        ],
      },
      {
        title: "Sides & Beverages",
        items: [
          {
            id: `${restaurant.id}_4`,
            name: "Cheesy Stuffed Garlic Bread",
            price: 149,
            description: "Freshly baked garlic breadstick filled with melted cheese and sweet corn.",
            image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
          },
          {
            id: `${restaurant.id}_5`,
            name: "Chilled Belgian Chocolate Milkshake",
            price: 129,
            description: "Rich dark cocoa thickshake blended with vanilla ice cream.",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            rating: 4.5,
          },
        ],
      },
    ];
  }

  // 2. Burgers / Fast Food (e.g. KFC, Burger King)
  if (cuisinesLower.includes("burger") || nameLower.includes("kfc") || nameLower.includes("burger")) {
    return [
      {
        title: "Signature Burgers & Buckets",
        items: [
          {
            id: `${restaurant.id}_1`,
            name: "Crispy Supreme Zinger Burger",
            price: 199,
            description: "Juicy golden fried fillet with crunchy lettuce and signature spiced mayonnaise in toasted sesame bun.",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: true,
            rating: 4.8,
          },
          {
            id: `${restaurant.id}_2`,
            name: "Double Patty Cheesy Veg Burger",
            price: 169,
            description: "Crispy spiced potato and pea double patty topped with melted cheddar slice and pickled gherkins.",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.6,
          },
          {
            id: `${restaurant.id}_3`,
            name: "Hot & Crispy Wings (4 Pcs)",
            price: 229,
            description: "Tender chicken wings seasoned with secret herbs and fried to crunchy perfection.",
            image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            rating: 4.7,
          },
        ],
      },
      {
        title: "Snacks & Drinks",
        items: [
          {
            id: `${restaurant.id}_4`,
            name: "Peri Peri Crinkle Fries",
            price: 99,
            description: "Golden crispy crinkle-cut fries tossed with aromatic peri-peri seasoning.",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
          },
          {
            id: `${restaurant.id}_5`,
            name: "Sparkling Iced Lemon Tea",
            price: 79,
            description: "Refreshing brewed black tea infused with natural lemon extract and mint leaves.",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            rating: 4.5,
          },
        ],
      },
    ];
  }

  // 3. Bakery & Desserts (e.g. Theobroma, Bakingo, NIC, Sweet Truth)
  if (cuisinesLower.includes("dessert") || cuisinesLower.includes("bakery") || cuisinesLower.includes("ice cream") || nameLower.includes("theobroma") || nameLower.includes("bakingo")) {
    return [
      {
        title: "Artisan Cakes & Brownies",
        items: [
          {
            id: `${restaurant.id}_1`,
            name: "Overload Chocolate Truffle Cake (500g)",
            price: 499,
            description: "Dense moist chocolate sponge layered with rich dark Belgian chocolate ganache.",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
          },
          {
            id: `${restaurant.id}_2`,
            name: "Millionaire Walnut Brownie (Pack of 2)",
            price: 180,
            description: "Fudgy cocoa brownie studded with roasted walnuts and drizzled with caramel.",
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
          },
          {
            id: `${restaurant.id}_3`,
            name: "Red Velvet Cream Cheese Jar",
            price: 159,
            description: "Layered red velvet cake crumbs with smooth whipped mascarpone cream cheese.",
            image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            rating: 4.7,
          },
        ],
      },
      {
        title: "Gourmet Shakes & Coolers",
        items: [
          {
            id: `${restaurant.id}_4`,
            name: "Fresh Strawberry Thick Shake",
            price: 149,
            description: "Blended real strawberries with rich vanilla cream and crushed ice.",
            image: "https://images.unsplash.com/photo-1553787499-6f9133860278?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
          },
        ],
      },
    ];
  }

  // 4. Biryani / Mughlai
  if (cuisinesLower.includes("biryani") || nameLower.includes("biryani") || cuisinesLower.includes("mughlai")) {
    return [
      {
        title: "Royal Dum Biryanis",
        items: [
          {
            id: `${restaurant.id}_1`,
            name: "Hyderabadi Chicken Dum Biryani",
            price: 299,
            description: "Aromatic long grain basmati rice slow cooked in sealed handi with tender chicken pieces, saffron, and mint.",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: true,
            rating: 4.8,
          },
          {
            id: `${restaurant.id}_2`,
            name: "Nizami Paneer Dum Biryani",
            price: 249,
            description: "Fragrant basmati rice layered with spiced cottage cheese cubes, caramelized fried onions, and kewra water.",
            image: "https://images.unsplash.com/photo-1642821373181-696a54913e9a?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.7,
          },
          {
            id: `${restaurant.id}_3`,
            name: "Tandoori Chicken Tikka (6 Pcs)",
            price: 279,
            description: "Boneless chicken marinated in spiced hung curd and roasted in charcoal clay tandoor.",
            image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            rating: 4.6,
          },
        ],
      },
      {
        title: "Accompaniments & Desserts",
        items: [
          {
            id: `${restaurant.id}_4`,
            name: "Shahi Mirchi Ka Salan",
            price: 69,
            description: "Traditional peanut, sesame seed, and coconut gravy with whole green chillies.",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            rating: 4.5,
          },
          {
            id: `${restaurant.id}_5`,
            name: "Hot Angoori Gulab Jamun (2 Pcs)",
            price: 79,
            description: "Soft milk dumplings soaked in cardamom and saffron sugar syrup.",
            image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
          },
        ],
      },
    ];
  }

  // 5. Chinese / Asian / Momos (e.g. Wow! China, Wow! Momo, Mainland China)
  if (cuisinesLower.includes("chinese") || cuisinesLower.includes("asian") || cuisinesLower.includes("momos") || nameLower.includes("china") || nameLower.includes("momo")) {
    return [
      {
        title: "Dim Sums & Starters",
        items: [
          {
            id: `${restaurant.id}_1`,
            name: "Steamed Darjeeling Veg Momos (6 Pcs)",
            price: 139,
            description: "Thin translucent wrapper stuffed with finely minced garden vegetables and served with spicy red chutney.",
            image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
          },
          {
            id: `${restaurant.id}_2`,
            name: "Crispy Chilli Chicken Dry",
            price: 249,
            description: "Batter fried chicken chunks tossed with bell peppers, garlic, spring onions, and dark soya sauce.",
            image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
          },
        ],
      },
      {
        title: "Noodles & Bowls",
        items: [
          {
            id: `${restaurant.id}_3`,
            name: "Wok-Tossed Veg Hakka Noodles",
            price: 189,
            description: "Fresh noodles stir-fried with shredded cabbage, carrots, capsicum, and oriental sauces.",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.6,
          },
          {
            id: `${restaurant.id}_4`,
            name: "Burnt Garlic Fried Rice Bowl",
            price: 199,
            description: "Fluffy rice tossed with golden fried garlic, vegetables, and aromatic seasoning.",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            rating: 4.5,
          },
        ],
      },
    ];
  }

  // 6. Healthy / Subs / Salads (e.g. Subway)
  if (nameLower.includes("subway") || cuisinesLower.includes("sandwich") || cuisinesLower.includes("salad")) {
    return [
      {
        title: "Signature Subs (15 cm / 6 Inch)",
        items: [
          {
            id: `${restaurant.id}_1`,
            name: "Paneer Tikka Sub",
            price: 219,
            description: "Fresh multigrain bread packed with marinated paneer, crisp veggies, and southwestern chipotle sauce.",
            image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
          },
          {
            id: `${restaurant.id}_2`,
            name: "Roasted Chicken Breast Sub",
            price: 249,
            description: "Tender sliced roasted chicken with fresh lettuce, tomatoes, cucumbers, and honey mustard sauce.",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: true,
            rating: 4.7,
          },
        ],
      },
      {
        title: "Salads & Cookies",
        items: [
          {
            id: `${restaurant.id}_3`,
            name: "Garden Fresh Greek Salad Bowl",
            price: 179,
            description: "Crispy lettuce, black olives, bell peppers, sweet corn, and light vinaigrette dressing.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            rating: 4.6,
          },
          {
            id: `${restaurant.id}_4`,
            name: "Double Chocolate Chip Cookie",
            price: 59,
            description: "Freshly baked soft-centered cookie loaded with dark chocolate chips.",
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
          },
        ],
      },
    ];
  }

  // 7. Default Indian / South Indian / Multi-Cuisine
  return [
    {
      title: "Chef's Special Recommendations",
      items: [
        {
          id: `${restaurant.id}_1`,
          name: `Special ${name} Thali / Platter`,
          price: 249,
          description: "Curated chef selection with aromatic curry, dal, seasoned rice, fresh bread, salad, and dessert.",
          image: restaurant.image || "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80",
          isVeg: true,
          isBestseller: true,
          rating: 4.8,
        },
        {
          id: `${restaurant.id}_2`,
          name: "Butter Paneer Masala Gravy Bowl",
          price: 220,
          description: "Fresh cottage cheese cubes cooked in creamy buttery tomato gravy with fenugreek and garam masala.",
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80",
          isVeg: true,
          isBestseller: true,
          rating: 4.7,
        },
        {
          id: `${restaurant.id}_3`,
          name: "Butter Garlic Naan (2 Pcs)",
          price: 70,
          description: "Soft leavened refined flour flatbread cooked in tandoor and brushed with garlic butter.",
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
          isVeg: true,
          isBestseller: false,
          rating: 4.9,
        },
      ],
    },
    {
      title: "Starters & Beverages",
      items: [
        {
          id: `${restaurant.id}_4`,
          name: "Crispy Veg Spring Rolls (6 Pcs)",
          price: 130,
          description: "Golden fried crunchy pastry rolls stuffed with spiced vegetables.",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
          isVeg: true,
          isBestseller: false,
          rating: 4.6,
        },
        {
          id: `${restaurant.id}_5`,
          name: "Fresh Sweet Lassi",
          price: 60,
          description: "Traditional chilled sweetened curd beverage flavored with cardamom and rose water.",
          image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80",
          isVeg: true,
          isBestseller: true,
          rating: 4.8,
        },
      ],
    },
  ];
};

// 1. GET /api/restaurants (Listing & Search)
app.get("/api/restaurants", async (req, res) => {
  const { q } = req.query;

  try {
    const swiggyRes = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING",
      { headers: SWIGGY_HEADERS }
    );

    if (!swiggyRes.ok) throw new Error("Swiggy API blocked");
    const json = await swiggyRes.json();

    let rawList = [];
    json?.data?.cards?.forEach((card) => {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) rawList = [...rawList, ...restaurants];
    });

    // Deduplicate restaurants by ID
    const seenIds = new Set();
    const uniqueList = rawList.filter((item) => {
      const id = String(item?.info?.id || item?.id || "");
      if (!id || seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    });

    let normalized = uniqueList.map(normalizeRestaurant);

    // Cache every restaurant into memory
    normalized.forEach((r) => restaurantCache.set(String(r.id), r));

    if (q) {
      const searchLower = q.toLowerCase();
      normalized = normalized.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.cuisines.some((c) => c.toLowerCase().includes(searchLower))
      );
    }

    res.json({ restaurants: normalized });
  } catch (error) {
    console.warn("Backend Live API error, returning normalized fallback:", error.message);
    let fallback = MOCK_RESTAURANTS;
    if (q) {
      const searchLower = q.toLowerCase();
      fallback = fallback.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.cuisines.some((c) => c.toLowerCase().includes(searchLower))
      );
    }
    fallback.forEach((r) => restaurantCache.set(String(r.id), r));
    res.json({ restaurants: fallback });
  }
});

// 2. GET /api/restaurants/:id/menu (Normalized Menu)
app.get("/api/restaurants/:id/menu", async (req, res) => {
  const { id } = req.params;
  const cached = restaurantCache.get(String(id));

  try {
    const swiggyRes = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`,
      { headers: SWIGGY_HEADERS }
    );

    if (!swiggyRes.ok) throw new Error("Swiggy Menu API error");
    const json = await swiggyRes.json();

    const info =
      json?.data?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info ||
      json?.data?.cards[2]?.card?.card?.info ||
      json?.data?.cards[0]?.card?.card?.info ||
      {};

    const restaurant = {
      id: String(info.id || id),
      name: info.name || cached?.name || "Restaurant",
      image: info.cloudinaryImageId
        ? `${CDN_BASE}${info.cloudinaryImageId}`
        : (cached?.image || "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80"),
      rating: parseFloat(info.avgRating || cached?.rating || 4.5),
      totalRatingsString: info.totalRatingsString || "1.2K+ ratings",
      costForTwo: info.costForTwoMessage || cached?.costForTwo || "₹350 for two",
      cuisines: info.cuisines || cached?.cuisines || ["Multi-Cuisine"],
      deliveryTime: info.sla?.slaString || (cached ? `${cached.deliveryTime} min` : "25–30 min"),
    };

    const regularCards =
      json?.data?.cards?.find((c) => c?.groupedCard?.cardGroupMap?.REGULAR)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
      json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
      [];

    const rawCategories = regularCards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    const categories = rawCategories.map((cat) => ({
      title: cat.card.card.title,
      items: (cat.card.card.itemCards || []).map((item) => {
        const d = item.card.info;
        return {
          id: String(d.id),
          name: d.name,
          price: (d.price || d.defaultPrice || 14000) / 100,
          description: d.description || "",
          image: d.imageId
            ? `${CDN_BASE}${d.imageId}`
            : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
          isVeg: d.isVeg === 1 || d.itemAttribute?.vegClassifier === "VEG",
          isBestseller: Boolean(d.isBestseller),
          rating: d.ratings?.aggregatedRating?.rating
            ? parseFloat(d.ratings.aggregatedRating.rating)
            : 4.4,
        };
      }),
    }));

    if (categories.length === 0) throw new Error("No categories parsed");

    res.json({ restaurant, categories });
  } catch (error) {
    const targetRestaurant = cached || {
      id: String(id),
      name: "Swaad Special Kitchen",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80",
      rating: 4.5,
      totalRatingsString: "1.2K+ ratings",
      costForTwo: "₹350 for two",
      cuisines: ["North Indian", "South Indian", "Chinese"],
      deliveryTime: "25–30 min",
    };

    console.log(`Serving customized menu for restaurant [${targetRestaurant.id}]: ${targetRestaurant.name}`);
    const generatedCategories = generateRestaurantMenu(targetRestaurant);

    res.json({
      restaurant: {
        id: String(targetRestaurant.id),
        name: targetRestaurant.name,
        image: targetRestaurant.image,
        rating: targetRestaurant.rating || 4.5,
        totalRatingsString: "1.5K+ ratings",
        costForTwo: targetRestaurant.costForTwo || "₹350 for two",
        cuisines: targetRestaurant.cuisines || ["Multi-Cuisine"],
        deliveryTime: typeof targetRestaurant.deliveryTime === 'number' ? `${targetRestaurant.deliveryTime} min` : (targetRestaurant.deliveryTime || "25–30 min"),
      },
      categories: generatedCategories,
    });
  }
});

// 3. GET /api/menu/search (Detailed Dish Search)
app.get("/api/menu/search", (req, res) => {
  const { q, restaurantId } = req.query;
  const sampleDishes = [
    {
      id: "dish_1",
      name: "Special Masala Dosa",
      price: 140,
      description: "Crispy golden crepe with spiced potato filling, coconut chutney and sambar.",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=80",
      isVeg: true,
      rating: 4.8,
    },
    {
      id: "dish_2",
      name: "Paneer Biryani",
      price: 249,
      description: "Fragrant rice layered with spices and paneer.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
      isVeg: true,
      rating: 4.6,
    },
  ];

  if (!q) return res.json({ dishes: sampleDishes });
  const filtered = sampleDishes.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase())
  );
  res.json({ dishes: filtered });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Swaad Backend API Normalizer listening on http://localhost:${PORT}`);
});
