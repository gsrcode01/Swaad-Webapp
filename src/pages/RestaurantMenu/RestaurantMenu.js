import React, { useState } from "react";
import Shimmer from "../../components/Shimmer/Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import RestaurantCategory from "../../components/RestaurantCategory/RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info ||
    resInfo?.cards[2]?.card?.card?.info ||
    resInfo?.cards[0]?.card?.card?.info ||
    {};

  const regularCards =
    resInfo?.cards?.find((c) => c?.groupedCard?.cardGroupMap?.REGULAR)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    [];

  const categories = regularCards.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg text-gray-600">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      {/* categories accordions */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() =>
            setShowIndex(index === showIndex ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
