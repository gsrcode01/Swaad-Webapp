import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import {
  UserIcon,
  LocationIcon,
  HeartIcon,
  OrdersIcon,
} from "../../components/common/Icons/Icons";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "info";
  const [activeTab, setActiveTab] = useState(initialTab);

  const user = useSelector((store) => store.user);
  const favorites = useSelector((store) => store.user.favorites);
  const pastOrders = useSelector((store) => store.orders.pastOrders);

  const tabs = [
    { id: "info", label: "Personal Information", icon: <UserIcon className="w-4 h-4" /> },
    { id: "addresses", label: "Saved Addresses", icon: <LocationIcon className="w-4 h-4" /> },
    { id: "favorites", label: "Favorites", icon: <HeartIcon className="w-4 h-4" /> },
    { id: "orders", label: "Past Orders", icon: <OrdersIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-headline text-[#172B4D]">My Account</h1>
        <p className="text-xs text-[#667085] font-body">
          Manage your profile, delivery addresses, and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Tab Navigation */}
        <div className="md:col-span-4 bg-white border border-[#E8E5E1] rounded-3xl p-3 shadow-xs space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-subhead flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#FFF8F1] text-[#FF5A36] font-bold shadow-xs"
                  : "text-[#172B4D] hover:bg-[#FCFAF7]"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Content View */}
        <div className="md:col-span-8 bg-white border border-[#E8E5E1] rounded-3xl p-6 sm:p-8 shadow-xs">
          {activeTab === "info" && (
            <div className="space-y-6 animate-scale-in">
              <h3 className="text-xl font-headline text-[#172B4D]">
                Personal Information
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#667085] font-subhead mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full bg-[#FCFAF7] border border-[#E8E5E1] rounded-xl p-3 text-[#172B4D] font-subhead focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>
                <div>
                  <label className="block text-[#667085] font-subhead mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full bg-[#FCFAF7] border border-[#E8E5E1] rounded-xl p-3 text-[#172B4D] font-subhead focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>
                <div>
                  <label className="block text-[#667085] font-subhead mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={user.phone}
                    className="w-full bg-[#FCFAF7] border border-[#E8E5E1] rounded-xl p-3 text-[#172B4D] font-subhead focus:outline-none focus:border-[#FF5A36]"
                  />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4 animate-scale-in">
              <h3 className="text-xl font-headline text-[#172B4D]">
                Saved Addresses
              </h3>
              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl border border-[#E8E5E1] bg-[#FCFAF7] flex justify-between items-start"
                  >
                    <div>
                      <span className="font-headline text-xs text-[#172B4D] flex items-center gap-1.5 mb-1">
                        <LocationIcon className="w-3.5 h-3.5 text-[#FF5A36]" /> {addr.tag}
                      </span>
                      <p className="text-xs text-[#667085] leading-relaxed font-body">
                        {addr.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-4 animate-scale-in">
              <h3 className="text-xl font-headline text-[#172B4D]">
                Favorite Restaurants ({favorites.length})
              </h3>
              {favorites.length === 0 ? (
                <p className="text-xs text-[#667085] font-body">
                  You haven't added any restaurants to your favorites yet. Click the heart icon on any card!
                </p>
              ) : (
                <div className="p-4 bg-[#FFF8F1] border border-[#FF5A36]/30 rounded-2xl text-xs text-[#FF5A36] font-subhead flex items-center gap-2">
                  <HeartIcon className="w-4 h-4" filled={true} /> You have {favorites.length} saved restaurant(s).
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4 animate-scale-in">
              <h3 className="text-xl font-headline text-[#172B4D]">Past Orders</h3>
              <div className="space-y-3">
                {pastOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl border border-[#E8E5E1] bg-[#FCFAF7] flex justify-between items-center text-xs"
                  >
                    <div>
                      <p className="font-headline text-[#172B4D]">
                        {ord.restaurantName}
                      </p>
                      <p className="text-[#667085] font-body">
                        {ord.itemCount} items • ₹{ord.totalAmount}
                      </p>
                    </div>
                    <Link to="/orders">
                      <Button variant="outline" size="sm">
                        View Receipt
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
