import React from "react";

export const RestaurantCardSkeleton = () => (
  <div className="w-full h-full p-4 rounded-3xl bg-white border border-[#E8E5E1] shadow-xs animate-pulse">
    <div className="w-full h-48 sm:h-52 bg-gray-200 rounded-2xl"></div>
    <div className="mt-3.5 space-y-2">
      <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
      <div className="h-3.5 bg-gray-200 rounded-md w-1/2"></div>
    </div>
    <div className="mt-4 pt-3 border-t border-[#E8E5E1] flex justify-between">
      <div className="h-5 bg-gray-200 rounded-xl w-14"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

export const MenuSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
    <div className="h-36 bg-white border border-[#E8E5E1] rounded-3xl p-6 mb-8">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-20 bg-white border border-[#E8E5E1] rounded-2xl p-4"></div>
      ))}
    </div>
  </div>
);

export const CartSkeleton = () => (
  <div className="max-w-3xl mx-auto my-8 p-6 bg-white border border-[#E8E5E1] rounded-3xl shadow-xs animate-pulse">
    <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center py-4 border-b border-[#E8E5E1]">
          <div className="space-y-2 w-2/3">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-20 h-16 bg-gray-200 rounded-xl"></div>
        </div>
      ))}
    </div>
  </div>
);

const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
      {Array(8)
        .fill("")
        .map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
    </div>
  );
};

export default Skeleton;
