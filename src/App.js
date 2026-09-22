import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import UserContext from "./context/UserContext";

import AppShell from "./components/layout/AppShell/AppShell";
import Home from "./pages/Home/Home";
import RestaurantMenu from "./pages/RestaurantMenu/RestaurantMenu";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import Offers from "./pages/Offers/Offers";
import ContactUs from "./pages/ContactUs/ContactUs";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/Error/Error";
import "./style.css";

// Lazy Loaded Routes
const Grocery = lazy(() => import("./pages/Grocery/Grocery"));
const About = lazy(() => import("./pages/About/About"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurants",
        element: <Home scrollToRestaurants={true} />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/track/:orderId",
        element: <OrderTracking />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<div className="p-12 text-center text-sm font-subhead text-[#667085]">Loading Grocery Mart...</div>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div className="p-12 text-center text-sm font-subhead text-[#667085]">Loading About...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  const [userName, setUserName] = useState("Girdhar");

  useEffect(() => {
    // Simulated Authentication
    const data = { name: "Girdhar" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <RouterProvider router={appRouter} />
      </UserContext.Provider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);