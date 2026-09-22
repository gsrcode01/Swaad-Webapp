import React, { useState } from "react";
import Button from "../../common/Button/Button";
import {
  SearchIcon,
  LightningIcon,
  StarIcon,
  SparklesIcon,
} from "../../common/Icons/Icons";

const Hero = ({ onSearch, onSelectCuisine }) => {
  const [query, setQuery] = useState("");

  const quickTags = [
    "Biryani",
    "Pizza",
    "Burgers",
    "South Indian",
    "Chinese",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="bg-gradient-to-br from-[#FFF8F1] via-white to-[#FFF8F1] border border-[#E8E5E1] rounded-3xl p-6 sm:p-10 mb-10 shadow-xs relative overflow-hidden">
      {/* Soft background shape */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF5A36]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Copy & Search */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8F1] border border-[#FF5A36]/20 text-[#FF5A36] text-xs font-bold uppercase tracking-wider font-subhead">
            <SparklesIcon className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Taste the better side of life</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#172B4D] leading-tight tracking-tight font-headline">
            Good food, <br />
            <span className="text-[#FF5A36]">just a few clicks away.</span>
          </h1>

          <p className="text-[#667085] text-sm sm:text-base leading-relaxed max-w-lg font-body">
            Discover hand-curated restaurants, delicious meals, and quick groceries you'll actually love to eat.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white border border-[#E8E5E1] rounded-2xl p-2 shadow-xs focus-within:border-[#FF5A36] focus-within:shadow-md transition-all max-w-lg"
          >
            <span className="text-[#667085] pl-2">
              <SearchIcon className="w-4 h-4 text-[#667085]" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search restaurants, dishes, cuisines..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-[#172B4D] placeholder-[#667085] px-2 font-body"
            />
            <Button variant="primary" size="md" type="submit">
              Search
            </Button>
          </form>

          {/* Quick Cuisine Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-semibold text-[#667085] font-subhead">Popular:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  onSelectCuisine(tag);
                }}
                className="px-3.5 py-1 bg-white hover:bg-[#FFF8F1] border border-[#E8E5E1] hover:border-[#FF5A36]/40 text-[#172B4D] hover:text-[#FF5A36] text-xs font-subhead rounded-full cursor-pointer transition-all active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Visual with Floating Badges */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            {/* Dish Image */}
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
              alt="Delicious Gourmet Burger"
              className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white"
            />

            {/* Floating Badge 1: Superfast */}
            <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md border border-[#E8E5E1] px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-float">
              <div className="w-8 h-8 rounded-xl bg-[#FFF8F1] flex items-center justify-center text-[#FF5A36]">
                <LightningIcon className="w-4 h-4 text-[#FF5A36]" />
              </div>
              <div>
                <p className="text-[10px] text-[#667085] font-subhead uppercase tracking-wider">Superfast</p>
                <p className="text-xs font-headline text-[#172B4D]">25–30 Mins</p>
              </div>
            </div>

            {/* Floating Badge 2: Top Rated */}
            <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md border border-[#E8E5E1] px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F8F1] flex items-center justify-center text-[#16A36A]">
                <StarIcon className="w-4 h-4 text-[#16A36A]" filled={true} />
              </div>
              <div>
                <p className="text-[10px] text-[#667085] font-subhead uppercase tracking-wider">Top Rated</p>
                <p className="text-xs font-headline text-[#16A36A]">4.8+ Stars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
