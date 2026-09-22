import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartDrawerOpen } from "../../../store/slices/uiSlice";

const FloatingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  if (!cartItems || cartItems.length === 0) return null;

  const totalCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      ((item.card?.info?.price || item.card?.info?.defaultPrice || item.price || 0) / 100) *
        (item.quantity || 1),
    0
  );

  return (
    <div className="fixed bottom-16 lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 select-none animate-scale-in">
      <button
        onClick={() => dispatch(setCartDrawerOpen(true))}
        className="w-full bg-[#FF5A36] hover:bg-[#E94B2F] text-white p-3.5 sm:px-6 sm:py-3.5 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer transition-all duration-200 active:scale-98"
      >
        <div className="flex items-center gap-3">
          <span className="bg-white text-[#FF5A36] text-xs font-black px-2 py-0.5 rounded-md">
            {totalCount} {totalCount === 1 ? "ITEM" : "ITEMS"}
          </span>
          <span className="font-extrabold text-base">₹{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-1.5 font-bold text-sm">
          <span>View Cart</span>
          <span>→</span>
        </div>
      </button>
    </div>
  );
};

export default FloatingCart;
