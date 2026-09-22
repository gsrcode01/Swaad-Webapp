# 🍊 Swaad — Taste the better side of life

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Parcel](https://img.shields.io/badge/Parcel-2.x-8DD6F9?style=flat&logo=parcel&logoColor=black)](https://parceljs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**Swaad** is a food ordering and discovery web application designed for browsing top-rated restaurants, exploring diverse culinary dishes, customizing meals, and ordering food with ease.

---

## ✨ Features

- 🍕 **Live Restaurant Discovery & Filtering**: Real-time listing of top restaurants with instant search, top-rated filter (4.0+), and quick cuisine filter tags (*Biryani, Pizza, Burgers, South Indian, Chinese, Desserts*).
- 📜 **Dynamic Restaurant Menu Resolver**: Collapsible accordion categories with veg/non-veg badges, dish ratings, descriptions, pricing, and high-res food images.
- 🛒 **Full-Featured Cart & State Management**: Powered by **Redux Toolkit** — add/remove items, adjust quantities, compute taxes/delivery fees, and place orders with instant visual feedback.
- ❤️ **Favorites & Wishlist**: Toggle and persist favorite restaurants across visits.
- ⚡ **Performance & Code Splitting**: Route-level lazy loading (`React.lazy` & `Suspense`) for `Grocery` and `About` bundles to optimize initial load times.
- 🌐 **Network Awareness**: Real-time offline detection and automatic recovery banners via custom `useOnlineStatus` hook.
- 🎨 **Modern Design & Typography**: Custom Gilroy typography hierarchy (`Gilroy ExtraBold`, `Gilroy Medium`, `Gilroy Light`), brand color palette, and micro-interactions.
- 🔄 **Express API Normalizer & Proxy**: Robust Node.js server that fetches live Swiggy data with fallback in-memory caching to guarantee zero broken images or missing menus.

---

## 🛠️ Tech Stack

### **Frontend**
- **Core**: React 19, JavaScript (ES6+), HTML5
- **Routing**: `react-router-dom` (v6) with dynamic nested routes & lazy loading
- **State Management**: `@reduxjs/toolkit` & `react-redux`
- **Styling**: Tailwind CSS (v4), Vanilla CSS design tokens, SVG icon library
- **Bundler**: Parcel (`--no-cache`)

### **Backend & Normalizer**
- **Server**: Node.js & Express 5
- **Middleware**: `cors`, `express.json()`
- **Data Layer**: Live Swiggy upstream API + resilient mock database cache

---

## 🎨 Brand Design Tokens

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| **Primary Orange** | `#FF5A36` | Primary CTAs, highlights, active states |
| **Deep Orange** | `#E94B2F` | Accents, badges, alert icons |
| **Cream** | `#FFF8F1` | Background badges, pill highlights |
| **Warm Background** | `#FCFAF7` | Application page background |
| **Dark Text** | `#172B4D` | Headings and high-contrast labels |
| **Muted Text** | `#667085` | Subtitles, meta info, descriptions |
| **Success Green** | `#16A36A` | Ratings, veg indicators, delivery tags |
| **Light Green** | `#E8F8F1` | Rating badges, pill containers |
| **Border** | `#E8E5E1` | Card outlines, dividers |

---

## 📁 Project Structure

```text
Swaad_WebApp/
├── index.html                   # Entry HTML template
├── package.json                 # Dependencies and build scripts
├── server.js                    # Express API normalizer & proxy server (Port 5001)
├── tailwind.config.js           # Tailwind configuration
├── .gitignore                   # Production Git ignore rules
└── src/
    ├── App.js                   # Root router configuration & Redux provider setup
    ├── style.css                # Global font faces & design tokens
    ├── components/
    │   ├── Logo/                # Swaad brand SVG wordmark
    │   ├── layout/              # Header, MobileBottomNav, Footer
    │   ├── home/                # Hero, CuisineList, OffersBanner
    │   ├── restaurant/          # RestaurantCategory, ItemList
    │   ├── RestaurantCard/      # Restaurant card with promoted HOC
    │   ├── cart/                # CartItem, OrderSummary
    │   ├── common/              # Skeleton, Icons, EmptyState, Badges
    │   ├── User/                # Functional founder card
    │   └── UserClass/           # Class-based founder card
    ├── pages/
    │   ├── Home/                # Main restaurant discovery & search
    │   ├── RestaurantMenu/      # Detailed restaurant menu page
    │   ├── Cart/                # Checkout & order placement page
    │   ├── Orders/              # Order history & status
    │   ├── Grocery/             # Lazy-loaded grocery store
    │   ├── About/               # Lazy-loaded about page
    │   ├── Contact/             # Support & contact page
    │   └── Error/               # 404 & route boundary error page
    ├── services/
    │   └── restaurantApi.js     # Unified API client
    ├── hooks/
    │   ├── useRestaurantMenu.js # Custom menu data fetching hook
    │   └── useOnlineStatus.js   # Browser online/offline listener
    ├── store/
    │   ├── index.js             # Redux store config
    │   └── slices/
    │       ├── cartSlice.js     # Cart state, items & price reducers
    │       └── userSlice.js     # User profile & favorites state
    └── utils/
        ├── constants.js         # Endpoints & CDN constants
        └── mockdata.js          # Fallback restaurant & menu database
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/gsrcode/Swaad_WebApp.git
cd Swaad_WebApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Servers
To start both the Express backend server (port `5001`) and the Parcel frontend (port `1234`) concurrently:
```bash
npm start
# or
npm run dev
```

Open your browser at:
- **Frontend App**: [http://localhost:1234](http://localhost:1234)
- **Backend API**: [http://localhost:5001/api/restaurants](http://localhost:5001/api/restaurants)

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Runs backend (`server.js`) & frontend (`parcel`) concurrently |
| `npm run dev` | Alias for `npm start` |
| `npm run frontend` | Starts only the Parcel development server on `http://localhost:1234` |
| `npm run backend` | Starts only the Express API server on `http://localhost:5001` |
| `npm run build` | Bundles and optimizes production assets into `/dist` |
| `npm test` | Runs the test suite via Jest |

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/restaurants` | Returns normalized list of restaurants (supports `?search=` query) |
| `GET` | `/api/restaurants/:id` | Returns restaurant details & categorized menu items |
| `GET` | `/api/health` | Health check endpoint |

---

## 👨‍💻 Author

**Girdhar**  
- **GitHub**: [@gsrcode](https://github.com/gsrcode)  
- **Project**: [Swaad WebApp](https://github.com/gsrcode/Swaad_WebApp)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
