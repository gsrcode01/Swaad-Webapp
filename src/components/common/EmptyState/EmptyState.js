import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { FoodDishIcon } from "../Icons/Icons";

const EmptyState = ({
  icon,
  title = "Nothing found",
  description = "Good food is just a few clicks away.",
  actionText = "Explore Restaurants",
  actionLink = "/",
  onAction,
}) => {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-[#FFF8F1] border border-[#FF5A36]/20 text-[#FF5A36] flex items-center justify-center mx-auto mb-4 shadow-sm">
        {icon || <FoodDishIcon className="w-8 h-8" />}
      </div>
      <h2 className="text-xl font-headline text-[#172B4D] mb-2">{title}</h2>
      <p className="text-xs text-[#667085] mb-6 leading-relaxed font-body">
        {description}
      </p>
      {actionLink ? (
        <Link to={actionLink}>
          <Button variant="primary">{actionText}</Button>
        </Link>
      ) : onAction ? (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
