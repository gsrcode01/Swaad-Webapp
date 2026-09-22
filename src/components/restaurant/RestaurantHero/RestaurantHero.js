import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../../store/slices/userSlice";
import {
  StarIcon,
  LightningIcon,
  HeartIcon,
} from "../../common/Icons/Icons";

const RestaurantHero = ({ info, isVegOnly, onToggleVegOnly }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((store) => store.user.favorites);

  if (!info) return null;

  const {
    id,
    name,
    cuisines,
    rating,
    avgRating,
    totalRatingsString,
    costForTwo,
    costForTwoMessage,
    deliveryTime,
    sla,
  } = info;

  const resRating = rating || avgRating || 4.5;
  const resCost = costForTwo || costForTwoMessage || "₹350 for two";
  const resTime = deliveryTime || sla?.slaString || "25–30 min";

  const isFavorite = favorites.includes(String(id));

  return (
    <div className="bg-white border border-[#E8E5E1] rounded-3xl p-6 sm:p-8 mb-8 shadow-xs relative overflow-hidden">
      {/* Top Back Navigation & Favorite */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-subhead text-[#667085] hover:text-[#FF5A36] bg-[#FCFAF7] border border-[#E8E5E1] px-3.5 py-1.5 rounded-xl transition-colors"
        >
          <span>←</span> Back to Restaurants
        </Link>

        <button
          onClick={() => dispatch(toggleFavorite(String(id)))}
          className={`flex items-center gap-1.5 text-xs font-subhead px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
            isFavorite
              ? "bg-[#FFF8F1] border-[#FF5A36] text-[#E94B2F] shadow-xs"
              : "bg-[#FCFAF7] border-[#E8E5E1] text-[#667085] hover:text-[#E94B2F]"
          }`}
        >
          <HeartIcon className="w-3.5 h-3.5" filled={isFavorite} />
          <span>{isFavorite ? "Favorited" : "Add Favorite"}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Restaurant Header Details */}
        <div className="space-y-3 flex-1">
          <h1 className="text-2xl sm:text-4xl font-headline text-[#172B4D] tracking-tight">
            {name}
          </h1>

          <p className="text-sm font-subhead text-[#667085]">
            {Array.isArray(cuisines) ? cuisines.join(", ") : cuisines}
          </p>

          {/* Key Metrics Pills */}
          <div className="flex items-center gap-3 flex-wrap pt-2">
            <div className="flex items-center gap-1 bg-[#E8F8F1] text-[#16A36A] px-3 py-1 rounded-xl text-xs font-headline">
              <StarIcon className="w-3.5 h-3.5 text-[#16A36A]" filled={true} />
              <span>{resRating}</span>
              <span className="font-body text-[11px] opacity-80">({totalRatingsString || "1.2K+ ratings"})</span>
            </div>

            <div className="flex items-center gap-1 bg-[#FFF8F1] text-[#FF5A36] px-3 py-1 rounded-xl text-xs font-subhead border border-[#FF5A36]/20">
              <LightningIcon className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>{typeof resTime === 'number' ? `${resTime} mins` : resTime}</span>
            </div>

            <div className="flex items-center gap-1 bg-[#FCFAF7] text-[#172B4D] px-3 py-1 rounded-xl text-xs font-subhead border border-[#E8E5E1]">
              <span>{resCost}</span>
            </div>
          </div>
        </div>

        {/* Veg Only Toggle Filter */}
        <div className="flex items-center gap-3 bg-[#FCFAF7] border border-[#E8E5E1] p-3 rounded-2xl select-none">
          <span className="text-xs font-headline text-[#172B4D]">Pure Veg</span>
          <button
            type="button"
            onClick={onToggleVegOnly}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              isVegOnly ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                isVegOnly ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
