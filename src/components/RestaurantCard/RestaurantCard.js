import React from "react";
import { CDN_URL } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId, costForTwo, sla } =
    resData?.info || {};

  return (
    <div className="m-4 p-4 w-[250px] h-[400px] rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer">
      <img
        className="rounded-lg w-full h-40 object-cover"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4 className="text-sm text-gray-600">{cuisines?.join(", ")}</h4>
      <h4 className="text-sm mt-1">⭐ {avgRating}</h4>
      <h4 className="text-sm">{costForTwo}</h4>
      <h4 className="text-sm">{sla?.slaString}</h4>
    </div>
  );
};

// Higher Order Component - Promoted Label
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-6 left-6 z-10 bg-black text-white text-xs font-bold px-2 py-1 rounded">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
