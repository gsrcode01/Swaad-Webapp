import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import { CDN_URL } from "../../utils/constants";
import { FoodDishIcon } from "../common/Icons/Icons";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items?.map((item) => {
        const info = item.card?.info || item;
        const price = (info.price || info.defaultPrice || 0) / 100;
        return (
          <div
            key={info.id}
            className="p-4 my-2 border-b border-[#E8E5E1] text-left flex justify-between items-start gap-4 hover:bg-[#FCFAF7] transition-colors rounded-2xl"
          >
            <div className="w-9/12">
              <div className="py-1">
                <span className="font-headline text-base text-[#172B4D]">
                  {info.name}
                </span>
                <span className="font-subhead font-bold text-sm text-[#172B4D] ml-2">
                  ₹{price}
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-1 leading-relaxed line-clamp-2 font-body">
                {info.description}
              </p>
            </div>

            <div className="w-3/12 relative flex flex-col items-center">
              {info.imageId ? (
                <img
                  src={info.imageId.startsWith("http") ? info.imageId : CDN_URL + info.imageId}
                  alt={info.name}
                  className="w-28 h-24 object-cover rounded-xl border border-[#E8E5E1]"
                />
              ) : (
                <div className="w-28 h-24 bg-[#FFF8F1] rounded-xl flex flex-col items-center justify-center text-xs text-[#FF5A36] border border-[#E8E5E1] gap-1 shadow-xs">
                  <FoodDishIcon className="w-6 h-6 text-[#FF5A36]" />
                  <span className="text-[10px] font-headline text-[#172B4D]">Swaad</span>
                </div>
              )}
              <button
                className="absolute -bottom-2 bg-white border border-[#FF5A36] text-[#FF5A36] hover:bg-[#FF5A36] hover:text-white font-headline text-xs px-5 py-1.5 rounded-lg shadow-sm cursor-pointer transition-all duration-150 uppercase tracking-wide"
                onClick={() => handleAddItem(item)}
              >
                Add +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
