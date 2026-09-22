import React from "react";

const CuisineList = ({ selectedCuisine, onSelectCuisine }) => {
  const cuisines = [
    {
      name: "Biryani",
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
    },
    {
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80",
    },
    {
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80",
    },
    {
      name: "South Indian",
      image:
        "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&auto=format&fit=crop&q=80",
    },
    {
      name: "Chinese",
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80",
    },
    {
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-5">
        <div>
          <h3 className="text-2xl sm:text-3xl font-headline text-[#172B4D]">Popular Cuisines</h3>
          <p className="text-xs sm:text-sm text-[#667085] font-body mt-1">Explore meals by your favorite category</p>
        </div>

        {selectedCuisine && (
          <button
            onClick={() => onSelectCuisine(null)}
            className="text-xs text-[#FF5A36] font-subhead font-bold hover:underline cursor-pointer bg-[#FFF8F1] border border-[#FF5A36]/30 px-3.5 py-1.5 rounded-xl w-fit"
          >
            Clear Filter ({selectedCuisine}) ✕
          </button>
        )}
      </div>

      {/* Cuisines Card Row */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none pt-1">
        {cuisines.map((cuisine) => {
          const isSelected = selectedCuisine === cuisine.name;
          return (
            <button
              key={cuisine.name}
              onClick={() =>
                onSelectCuisine(isSelected ? null : cuisine.name)
              }
              className={`flex flex-col items-center gap-3 min-w-[100px] p-3.5 rounded-2xl transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? "bg-[#FFF8F1] border-2 border-[#FF5A36] shadow-md -translate-y-1.5"
                  : "bg-white border border-[#E8E5E1] hover:-translate-y-1.5 hover:border-[#FF5A36]/50 hover:shadow-md"
              }`}
            >
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-xs font-subhead transition-colors ${
                  isSelected ? "text-[#FF5A36] font-bold" : "text-[#172B4D] group-hover:text-[#FF5A36]"
                }`}
              >
                {cuisine.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CuisineList;
