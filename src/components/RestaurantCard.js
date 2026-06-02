import React from "react";
import { IMG_CDN_URL } from "../utils/constants";   
const RestaurantCard = ({ ResData }) => {
  const { name, cuisines, avgRating, cloudinaryImageId } = ResData?.info;
  return (
    <div className="res-card">
      <div className="rest-image">
        <img
          src={IMG_CDN_URL + ResData.info.cloudinaryImageId}
          alt="restaurant"
          id="res-img"
        />
      </div>
      

      <div className="res-details">
        <h2>{name}</h2>
        <p>{cuisines.join(", ")}</p>
        <p>{avgRating}</p>
      </div>
    </div>
  );
};
export default RestaurantCard;