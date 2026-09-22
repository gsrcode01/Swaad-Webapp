import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
import UserContext from "../../../context/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { setCartDrawerOpen } from "../../../store/slices/uiSlice";
import {
  HomeIcon,
  RestaurantIcon,
  GroceryIcon,
  OffersIcon,
  OrdersIcon,
  HelpIcon,
  LocationIcon,
  HeartIcon,
  CartBagIcon,
  UserIcon,
} from "../../common/Icons/Icons";

const Header = () => {
  const dispatch = useDispatch();
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  const totalCartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const favorites = useSelector((store) => store.user.favorites);
  const selectedLocation = useSelector((store) => store.ui.selectedLocation);

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Restaurants", path: "/restaurants", icon: RestaurantIcon },
    { name: "Grocery", path: "/grocery", icon: GroceryIcon, badge: "10m", badgeColor: "bg-[#E8F8F1] text-[#16A36A]" },
    { name: "Offers", path: "/offers", icon: OffersIcon, badge: "50%", badgeColor: "bg-[#FFF8F1] text-[#FF5A36]" },
    { name: "Orders", path: "/orders", icon: OrdersIcon },
    { name: "Help", path: "/contact", icon: HelpIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E5E1] shadow-xs px-3 sm:px-6 lg:px-8 py-3 transition-all">
      <div className="w-full flex items-center justify-between gap-3 lg:gap-4">
        {/* 1. Left: Brand Logo & Location */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <Logo showTagline={true} />

          {/* Location Selector */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCFAF7] border border-[#E8E5E1] text-xs font-subhead text-[#172B4D] hover:border-[#FF5A36] hover:bg-[#FFF8F1] transition-all cursor-pointer">
            <LocationIcon className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span className="truncate max-w-[130px] font-semibold">{selectedLocation}</span>
            <span className="text-[#667085] text-[10px]">▼</span>
          </div>
        </div>

        {/* 2. Center: Desktop Main Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-xl font-subhead text-xs xl:text-sm transition-all duration-150 group relative cursor-pointer ${
                    isActive
                      ? "bg-[#FFF8F1] text-[#FF5A36] font-bold shadow-xs border border-[#FF5A36]/30"
                      : "text-[#172B4D] hover:bg-[#FCFAF7] hover:text-[#FF5A36]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-[#FF5A36]" : "text-[#667085] group-hover:text-[#FF5A36]"
                    }`} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className={`text-[9px] font-headline px-1.5 py-0.2 rounded-full uppercase tracking-wider ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* 3. Right: Action Controls (Status, Favorites, Cart, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Online Indicator */}
          <div
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FCFAF7] border border-[#E8E5E1]"
            title={onlineStatus ? "Network Online" : "Network Offline"}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                onlineStatus ? "bg-[#16A36A]" : "bg-[#E94B2F]"
              }`}
            ></span>
            <span className="text-[#667085] text-[11px] font-subhead">
              {onlineStatus ? "Live" : "Offline"}
            </span>
          </div>

          {/* Favorites Heart */}
          <Link
            to="/profile?tab=favorites"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl border border-[#E8E5E1] bg-[#FCFAF7] text-[#172B4D] hover:text-[#FF5A36] hover:border-[#FF5A36]/40 transition-colors relative group"
            title="Favorite Restaurants"
          >
            <HeartIcon className="w-4 h-4 text-[#667085] group-hover:text-[#FF5A36] transition-colors" />
            {favorites?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5A36] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => dispatch(setCartDrawerOpen(true))}
            className="flex items-center gap-2 bg-[#FFF8F1] border border-[#FF5A36]/40 text-[#FF5A36] font-subhead px-3.5 py-1.5 rounded-xl hover:bg-[#FF5A36] hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95 group"
          >
            <CartBagIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Cart</span>
            <span className="bg-[#FF5A36] text-white text-xs px-2 py-0.5 rounded-full font-bold group-hover:bg-white group-hover:text-[#FF5A36] transition-colors">
              {totalCartCount}
            </span>
          </button>

          {/* User Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E8E5E1] bg-[#FCFAF7] hover:border-[#FF5A36] text-[#172B4D] transition-colors font-subhead shadow-xs"
            title="My Profile"
          >
            <div className="w-6 h-6 rounded-full bg-[#FFF8F1] text-[#FF5A36] border border-[#FF5A36]/30 flex items-center justify-center">
              <UserIcon className="w-3.5 h-3.5 text-[#FF5A36]" />
            </div>
            <span className="text-xs font-headline text-[#172B4D] whitespace-nowrap">
              {loggedInUser || "Girdhar"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
