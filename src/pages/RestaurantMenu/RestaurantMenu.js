import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantMenu } from "../../services/restaurantApi";
import RestaurantHero from "../../components/restaurant/RestaurantHero/RestaurantHero";
import RestaurantCategory from "../../components/restaurant/RestaurantCategory/RestaurantCategory";
import { MenuSkeleton } from "../../components/common/Skeleton/Skeleton";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import { SearchIcon, CloseIcon, FoodDishIcon } from "../../components/common/Icons/Icons";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showIndex, setShowIndex] = useState(0);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");

  useEffect(() => {
    loadMenu();
  }, [resId]);

  const loadMenu = async () => {
    setLoading(true);
    const data = await fetchRestaurantMenu(resId);
    setMenuData(data);
    setLoading(false);
  };

  if (loading || !menuData) return <MenuSkeleton />;

  const { restaurant, categories = [] } = menuData;

  // Filter categories based on Pure Veg toggle and search
  let filteredCategories = categories.map((cat) => {
    const items = (cat.items || []).filter((dish) => {
      const matchesVeg = !isVegOnly || dish.isVeg === true;
      const matchesQuery = !menuSearch.trim() || dish.name?.toLowerCase().includes(menuSearch.toLowerCase());
      return matchesVeg && matchesQuery;
    });
    return { ...cat, items };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      {/* Restaurant Header Details */}
      <RestaurantHero
        info={restaurant}
        isVegOnly={isVegOnly}
        onToggleVegOnly={() => setIsVegOnly(!isVegOnly)}
      />

      {/* Menu Search Bar */}
      <div className="mb-6 max-w-md">
        <div className="flex items-center gap-2.5 bg-white border border-[#E8E5E1] rounded-2xl px-3 py-2 shadow-xs focus-within:border-[#FF5A36]">
          <SearchIcon className="w-4 h-4 text-[#667085]" />
          <input
            type="text"
            value={menuSearch}
            onChange={(e) => setMenuSearch(e.target.value)}
            placeholder="Search within this menu..."
            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#172B4D] placeholder-[#667085] font-subhead"
          />
          {menuSearch && (
            <button
              onClick={() => setMenuSearch("")}
              className="text-[#667085] hover:text-[#172B4D] p-1 cursor-pointer transition-colors"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Two-Column Category Navigation on Desktop, Accordions on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Sticky Category Quick Links (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 bg-white border border-[#E8E5E1] rounded-3xl p-4 shadow-xs">
          <p className="text-xs font-headline text-[#667085] uppercase tracking-wider px-3 mb-2">
            Menu Categories
          </p>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {filteredCategories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setShowIndex(idx)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-subhead flex items-center justify-between transition-all cursor-pointer ${
                  showIndex === idx
                    ? "bg-[#FFF8F1] text-[#FF5A36] font-headline border-l-4 border-[#FF5A36]"
                    : "text-[#172B4D] hover:bg-[#FCFAF7]"
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-[11px] text-[#667085] bg-[#FCFAF7] px-2 py-0.5 rounded-full font-body">
                  {cat.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Category Accordions & Dishes */}
        <div className="lg:col-span-8">
          {filteredCategories.length === 0 ? (
            <EmptyState
              icon={<FoodDishIcon className="w-8 h-8 text-[#FF5A36]" />}
              title="No dishes found"
              description="No menu items matched your search or veg filter. Try clearing the filter!"
              actionText="Reset Menu Filters"
              onAction={() => {
                setIsVegOnly(false);
                setMenuSearch("");
              }}
            />
          ) : (
            filteredCategories.map((category, index) => (
              <RestaurantCategory
                key={category.title}
                data={category}
                showItems={index === showIndex || menuSearch.trim().length > 0}
                setShowIndex={() =>
                  setShowIndex(index === showIndex ? null : index)
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
