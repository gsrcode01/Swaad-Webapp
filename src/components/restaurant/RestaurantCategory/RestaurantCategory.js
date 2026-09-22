import React from "react";
import DishCard from "../DishCard/DishCard";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    if (setShowIndex) {
      setShowIndex();
    }
  };

  const title = data.title || "Category";
  const items = data.items || data.itemCards || [];

  return (
    <div className="bg-white border border-[#E8E5E1] rounded-2xl shadow-xs overflow-hidden mb-4 transition-all">
      {/* Category Header Bar */}
      <div
        className="flex justify-between items-center p-4 sm:p-5 cursor-pointer hover:bg-[#FFF8F1] transition-colors select-none"
        onClick={handleClick}
      >
        <span className="font-extrabold text-base sm:text-lg text-[#172B4D]">
          {title} ({items.length})
        </span>
        <span
          className={`text-xs text-[#667085] transition-transform duration-200 ${
            showItems ? "rotate-180 text-[#FF5A36]" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* Category Dish List */}
      {showItems && (
        <div className="px-4 sm:px-5 pb-4 border-t border-[#E8E5E1] divide-y divide-[#E8E5E1]">
          {items.map((item) => (
            <DishCard key={item.id || item.card?.info?.id} dish={item.card ? undefined : item} item={item.card ? item : undefined} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
