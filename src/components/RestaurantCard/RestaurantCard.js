import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../store/slices/userSlice";
import { StarIcon, HeartIcon, ClockIcon } from "../common/Icons/Icons";

const RestaurantCard = ({ restaurant, resData }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.user.favorites);

  // Support both normalized { restaurant } and legacy { resData }
  const data = restaurant || resData?.info || resData || {};
  const id = String(data.id || "");
  const name = data.name || "Restaurant";
  const image = data.image || (data.cloudinaryImageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${data.cloudinaryImageId}` : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80");
  const rating = data.rating || data.avgRating || 4.2;
  const cuisines = Array.isArray(data.cuisines) ? data.cuisines : [];
  const deliveryTime = data.deliveryTime || data.sla?.slaString || "25–30 min";
  const costForTwo = data.costForTwo || "₹350 for two";

  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="w-full h-full p-4 rounded-3xl bg-white border border-[#E8E5E1] hover:border-[#FF5A36]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative select-none">
      {/* Food Image Container */}
      <div>
        <div className="relative overflow-hidden rounded-2xl h-48 sm:h-52 bg-[#FFF8F1]">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            src={image}
            alt={name}
            loading="lazy"
          />

          {/* Gradient Overlay for bottom text contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

          {/* Favorite Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
              isFavorite
                ? "bg-white text-[#E94B2F] scale-110 shadow-md"
                : "bg-black/35 text-white hover:bg-white hover:text-[#E94B2F] hover:scale-110"
            }`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <HeartIcon className="w-4 h-4" filled={isFavorite} />
          </button>
        </div>

        {/* Info */}
        <h3 className="font-headline text-lg text-[#172B4D] mt-3.5 truncate group-hover:text-[#FF5A36] transition-colors">
          {name}
        </h3>
        <p className="text-xs text-[#667085] mt-1 line-clamp-1 font-body">
          {cuisines.join(" · ")}
        </p>
      </div>

      {/* Meta Bar */}
      <div className="mt-4 pt-3 border-t border-[#E8E5E1] flex items-center justify-between text-xs font-subhead">
        <span className="flex items-center gap-1 bg-[#E8F8F1] text-[#16A36A] px-2.5 py-1 rounded-xl font-headline">
          <StarIcon className="w-3.5 h-3.5 text-[#16A36A]" filled={true} />
          <span>{rating}</span>
        </span>
        <span className="text-[#667085] font-subhead flex items-center gap-1">
          <ClockIcon className="w-3.5 h-3.5 text-[#667085]" />
          <span>{typeof deliveryTime === 'number' ? `${deliveryTime} min` : deliveryTime}</span>
        </span>
        <span className="text-[#172B4D] font-headline font-bold">{costForTwo}</span>
      </div>
    </div>
  );
};

// Higher Order Component - Promoted Label
export const withPromotedLabel = (RestaurantCardComponent) => {
  return (props) => {
    return (
      <div className="relative h-full">
        <label className="absolute top-7 left-7 z-10 bg-[#172B4D] text-[#FFF8F1] text-[10px] font-headline px-2.5 py-0.5 rounded-lg tracking-wider uppercase shadow-md pointer-events-none">
          Promoted
        </label>
        <RestaurantCardComponent {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
