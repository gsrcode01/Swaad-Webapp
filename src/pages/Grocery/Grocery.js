import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import Button from "../../components/common/Button/Button";
import {
  GroceryIcon,
  LightningIcon,
  StarIcon,
} from "../../components/common/Icons/Icons";

const Grocery = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fruits", "Vegetables", "Dairy & Eggs", "Snacks", "Beverages"];

  const products = [
    {
      id: "groc_1",
      name: "Fresh Alphonso Mangoes (1kg)",
      category: "Fruits",
      price: 240,
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&auto=format&fit=crop&q=80",
      rating: 4.8,
    },
    {
      id: "groc_2",
      name: "Organic Farm Fresh Milk (1L)",
      category: "Dairy & Eggs",
      price: 65,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80",
      rating: 4.9,
    },
    {
      id: "groc_3",
      name: "Crispy Potato Wafers (150g)",
      category: "Snacks",
      price: 45,
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80",
      rating: 4.5,
    },
    {
      id: "groc_4",
      name: "Fresh Crisp Broccoli (500g)",
      category: "Vegetables",
      price: 80,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&auto=format&fit=crop&q=80",
      rating: 4.7,
    },
    {
      id: "groc_5",
      name: "Cold Pressed Orange Juice (500ml)",
      category: "Beverages",
      price: 120,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&auto=format&fit=crop&q=80",
      rating: 4.6,
    },
    {
      id: "groc_6",
      name: "Farm Fresh Brown Eggs (Pack of 6)",
      category: "Dairy & Eggs",
      price: 75,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&auto=format&fit=crop&q=80",
      rating: 4.9,
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddGrocery = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price * 100,
        imageId: null,
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#16A36A] to-emerald-700 text-white rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-white/20 text-white text-xs font-headline px-3 py-1 rounded-full uppercase inline-flex items-center gap-1">
            <LightningIcon className="w-3.5 h-3.5 text-yellow-300" /> 10 Minute Express Grocery
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline flex items-center gap-2">
            Swaad Grocery Mart <GroceryIcon className="w-8 h-8 text-white" />
          </h1>
          <p className="text-white/90 text-xs sm:text-sm max-w-md font-body">
            Fresh produce, organic dairy, snacks, and daily kitchen essentials delivered in minutes.
          </p>
        </div>
        <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          <GroceryIcon className="w-12 h-12" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-subhead whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === cat
                ? "bg-[#16A36A] text-white shadow-xs"
                : "bg-white border border-[#E8E5E1] text-[#172B4D] hover:border-[#16A36A]/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-[#E8E5E1] rounded-2xl p-3 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-full h-32 rounded-xl overflow-hidden mb-2 bg-[#FFF8F1]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h4 className="font-headline text-xs text-[#172B4D] line-clamp-2 mb-1">
                {p.name}
              </h4>
              <span className="text-[10px] text-[#667085] flex items-center gap-1 mb-2 font-body">
                <StarIcon className="w-3 h-3 text-[#16A36A]" filled={true} /> {p.rating}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E8E5E1] flex items-center justify-between">
              <span className="font-headline text-xs text-[#172B4D]">
                ₹{p.price}
              </span>
              <button
                onClick={() => handleAddGrocery(p)}
                className="bg-[#E8F8F1] text-[#16A36A] hover:bg-[#16A36A] hover:text-white text-xs font-headline px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                ADD +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
