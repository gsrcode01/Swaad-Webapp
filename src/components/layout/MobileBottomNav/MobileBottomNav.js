import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartDrawerOpen } from "../../../store/slices/uiSlice";
import {
  HomeIcon,
  OffersIcon,
  CartBagIcon,
  OrdersIcon,
  UserIcon,
} from "../../common/Icons/Icons";

const MobileBottomNav = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const totalCartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E5E1] py-2 px-4 flex items-center justify-around shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-subhead transition-colors ${
            isActive ? "text-[#FF5A36] font-bold" : "text-[#667085]"
          }`
        }
      >
        <HomeIcon className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/offers"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-subhead transition-colors ${
            isActive ? "text-[#FF5A36] font-bold" : "text-[#667085]"
          }`
        }
      >
        <OffersIcon className="w-5 h-5" />
        <span>Offers</span>
      </NavLink>

      {/* Cart Trigger */}
      <button
        onClick={() => dispatch(setCartDrawerOpen(true))}
        className="flex flex-col items-center gap-1 text-[11px] font-subhead text-[#667085] hover:text-[#FF5A36] relative cursor-pointer"
      >
        <div className="relative">
          <CartBagIcon className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#FF5A36] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {totalCartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-subhead transition-colors ${
            isActive ? "text-[#FF5A36] font-bold" : "text-[#667085]"
          }`
        }
      >
        <OrdersIcon className="w-5 h-5" />
        <span>Orders</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-subhead transition-colors ${
            isActive ? "text-[#FF5A36] font-bold" : "text-[#667085]"
          }`
        }
      >
        <UserIcon className="w-5 h-5" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default MobileBottomNav;
