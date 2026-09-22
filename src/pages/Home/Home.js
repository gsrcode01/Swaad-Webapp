import React, { useEffect, useState } from "react";
import { fetchRestaurantList } from "../../services/restaurantApi";
import RestaurantCard, {
  withPromotedLabel,
} from "../../components/RestaurantCard/RestaurantCard";
import Skeleton from "../../components/common/Skeleton/Skeleton";
import Hero from "../../components/home/Hero/Hero";
import CuisineList from "../../components/home/CuisineList/CuisineList";
import OffersBanner from "../../components/home/OffersBanner/OffersBanner";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import { Link, useLocation } from "react-router-dom";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import {
  OfflineIcon,
  StarIcon,
  SearchIcon,
} from "../../components/common/Icons/Icons";

const Home = ({ scrollToRestaurants = false }) => {
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (scrollToRestaurants || location.pathname === "/restaurants" || location.hash === "#restaurants") {
      setTimeout(() => {
        const el = document.getElementById("restaurants");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [scrollToRestaurants, location.pathname, location.hash, loading]);

  const loadRestaurants = async (query = "") => {
    setLoading(true);
    const data = await fetchRestaurantList(query);
    setRestaurants(data);
    setFilteredRestaurants(data);
    setLoading(false);
  };

  const applyFilters = (query, cuisine, topRated) => {
    let result = [...restaurants];

    if (query.trim()) {
      result = result.filter(
        (res) =>
          res.name.toLowerCase().includes(query.toLowerCase()) ||
          res.cuisines.some((c) =>
            c.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (cuisine) {
      result = result.filter((res) =>
        res.cuisines.some((c) =>
          c.toLowerCase().includes(cuisine.toLowerCase())
        )
      );
    }

    if (topRated) {
      result = result.filter((res) => parseFloat(res.rating) >= 4.0);
    }

    setFilteredRestaurants(result);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, selectedCuisine, topRatedOnly);
  };

  const handleSelectCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    applyFilters(searchQuery, cuisine, topRatedOnly);
  };

  const handleToggleTopRated = () => {
    const nextVal = !topRatedOnly;
    setTopRatedOnly(nextVal);
    applyFilters(searchQuery, selectedCuisine, nextVal);
  };

  if (onlineStatus === false) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-[#E8E5E1] rounded-3xl text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#FFF8F1] border border-[#E94B2F]/20 text-[#E94B2F] flex items-center justify-center mx-auto mb-4">
          <OfflineIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-headline text-[#E94B2F] mb-2">You are offline</h2>
        <p className="text-xs text-[#667085] font-body">
          Please check your connection. We'll automatically reconnect once network is restored.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. Hero Section */}
      <Hero
        onSearch={handleSearch}
        onSelectCuisine={handleSelectCuisine}
      />

      {/* 2. Offers Banner */}
      <OffersBanner />

      {/* 3. Popular Cuisines Section */}
      <CuisineList
        selectedCuisine={selectedCuisine}
        onSelectCuisine={handleSelectCuisine}
      />

      {/* 4. Restaurant Grid Section */}
      <section id="restaurants">
        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-headline text-[#172B4D]">
              Top Restaurants Near You
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] font-body mt-0.5">
              Handpicked meals from kitchens delivered hot to your door
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleTopRated}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-subhead border transition-all cursor-pointer ${
                topRatedOnly
                  ? "bg-[#FF5A36] text-white border-[#FF5A36] shadow-sm"
                  : "bg-white text-[#172B4D] border-[#E8E5E1] hover:border-[#FF5A36]/40 hover:bg-[#FCFAF7]"
              }`}
            >
              <StarIcon className={`w-3.5 h-3.5 ${topRatedOnly ? "text-white" : "text-[#FF5A36]"}`} filled={true} />
              <span>Top Rated (4.0+)</span>
            </button>
          </div>
        </div>

        {/* Restaurant Cards Display */}
        {loading ? (
          <Skeleton />
        ) : filteredRestaurants.length === 0 ? (
          <EmptyState
            icon={<SearchIcon className="w-8 h-8 text-[#FF5A36]" />}
            title="No restaurants found"
            description="We couldn't find matches for your search or active filter. Try resetting filters!"
            actionText="Reset Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCuisine(null);
              setTopRatedOnly(false);
              setFilteredRestaurants(restaurants);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredRestaurants.map((res, index) => (
              <Link
                key={`${res.id}-${index}`}
                to={`/restaurants/${res.id}`}
                className="no-underline text-inherit block h-full"
              >
                {res.isPromoted ? (
                  <RestaurantCardPromoted restaurant={res} />
                ) : (
                  <RestaurantCard restaurant={res} />
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
