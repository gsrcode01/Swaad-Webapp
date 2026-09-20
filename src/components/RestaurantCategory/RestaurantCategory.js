import { useState } from "react";
import ItemList from "../ItemList/ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex, dummy }) => {
  const handleClick = () => {
    if (setShowIndex) {
      setShowIndex();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards?.length || 0})
          </span>
          <span>⬇️</span>
        </div>

        {showItems && <ItemList items={data.itemCards} dummy={dummy} />}
      </div>
      {/* Accordion Body */}
    </div>
  );
};

export default RestaurantCategory;
