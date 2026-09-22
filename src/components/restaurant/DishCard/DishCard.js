import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decreaseItemQuantity } from "../../../store/slices/cartSlice";
import { FoodDishIcon } from "../../common/Icons/Icons";

const DishCard = ({ dish, item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  // Support both normalized { dish } and legacy { item }
  const data = dish || item?.card?.info || item || {};
  const id = String(data.id || "");
  const name = data.name || "Special Dish";
  const price = typeof data.price === "number" && data.price > 1000 ? data.price / 100 : (data.price || 120);
  const description = data.description || "";
  const image = data.image || (data.imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fill/${data.imageId}` : "");
  const isVeg = data.isVeg === true || data.isVeg === 1 || data.itemAttribute?.vegClassifier === "VEG";

  const cartItem = cartItems.find((i) => String(i.id || i.card?.info?.id) === id);
  const quantity = cartItem?.quantity || 0;
  const [animating, setAnimating] = useState(false);

  const handleAdd = () => {
    setAnimating(true);
    dispatch(
      addItem({
        id,
        name,
        price,
        image,
        isVeg,
      })
    );
    setTimeout(() => setAnimating(false), 250);
  };

  const handleDecrease = () => {
    dispatch(decreaseItemQuantity(id));
  };

  return (
    <div className="py-4 px-2 border-b border-[#E8E5E1] last:border-b-0 flex justify-between items-start gap-4 hover:bg-[#FCFAF7] transition-colors rounded-2xl group select-none">
      {/* Dish Details */}
      <div className="w-8/12 sm:w-9/12">
        <div className="flex items-center gap-2 mb-1">
          {/* Veg/NonVeg Indicator */}
          <span
            className={`w-4 h-4 border-2 flex items-center justify-center rounded-xs ${
              isVeg ? "border-[#16A36A] text-[#16A36A]" : "border-[#E94B2F] text-[#E94B2F]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isVeg ? "bg-[#16A36A]" : "bg-[#E94B2F]"
              }`}
            ></span>
          </span>

          <h4 className="font-headline text-base text-[#172B4D] group-hover:text-[#FF5A36] transition-colors">
            {name}
          </h4>
        </div>

        <div className="font-subhead font-bold text-sm text-[#172B4D] mb-1.5">
          ₹{price}
        </div>

        {description && (
          <p className="text-xs text-[#667085] leading-relaxed line-clamp-2 font-body">
            {description}
          </p>
        )}
      </div>

      {/* Dish Image & Stepper Button */}
      <div className="w-4/12 sm:w-3/12 relative flex flex-col items-center">
        {image ? (
          <div className="w-28 h-24 sm:w-32 sm:h-24 rounded-2xl overflow-hidden border border-[#E8E5E1] shadow-xs">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-28 h-24 sm:w-32 sm:h-24 rounded-2xl bg-[#FFF8F1] border border-[#E8E5E1] flex flex-col items-center justify-center text-xs text-[#FF5A36] font-subhead gap-1 shadow-xs">
            <FoodDishIcon className="w-6 h-6 text-[#FF5A36]" />
            <span className="text-[10px] font-headline text-[#172B4D]">Swaad</span>
          </div>
        )}

        {/* Stepper / Add Button */}
        <div className="absolute -bottom-2 z-10">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`bg-white border border-[#FF5A36] text-[#FF5A36] hover:bg-[#FF5A36] hover:text-white font-headline text-xs px-5 py-1.5 rounded-xl shadow-md transition-all duration-150 cursor-pointer active:scale-90 ${
                animating ? "scale-90 bg-[#FF5A36] text-white" : ""
              }`}
            >
              ADD +
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#FF5A36] text-white rounded-xl px-2.5 py-1 shadow-md border border-[#E94B2F]">
              <button
                onClick={handleDecrease}
                className="font-bold text-sm px-1 hover:scale-125 cursor-pointer transition-transform"
              >
                −
              </button>
              <span className="text-xs font-headline min-w-3 text-center">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="font-bold text-sm px-1 hover:scale-125 cursor-pointer transition-transform"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
