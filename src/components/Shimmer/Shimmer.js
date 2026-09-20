import React from "react";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="m-4 p-4 w-[250px] h-[360px] rounded-xl bg-gray-200 animate-pulse shadow-sm flex flex-col justify-between"
          >
            <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 mt-4 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-full mt-4"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
