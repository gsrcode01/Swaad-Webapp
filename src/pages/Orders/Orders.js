import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../store/slices/cartSlice";
import { setCartDrawerOpen } from "../../store/slices/uiSlice";
import Button from "../../components/common/Button/Button";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import {
  OrdersIcon,
  DeliveryBikeIcon,
  RefreshIcon,
  CheckIcon,
  FoodDishIcon,
} from "../../components/common/Icons/Icons";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeOrders = useSelector((store) => store.orders.activeOrders);
  const pastOrders = useSelector((store) => store.orders.pastOrders);

  const [activeTab, setActiveTab] = useState("active"); // "active" or "past"

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      dispatch(
        addItem({
          id: item.id || Date.now(),
          name: item.name,
          price: item.price * 100,
        })
      );
    });
    dispatch(setCartDrawerOpen(true));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-headline text-[#172B4D]">Your Orders</h1>
          <p className="text-xs text-[#667085] font-body">
            Track ongoing deliveries or reorder your favorite meals
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border border-[#E8E5E1] p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-xl text-xs font-subhead transition-all cursor-pointer ${
              activeTab === "active"
                ? "bg-[#FF5A36] text-white shadow-xs"
                : "text-[#667085] hover:text-[#172B4D]"
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-xl text-xs font-subhead transition-all cursor-pointer ${
              activeTab === "past"
                ? "bg-[#FF5A36] text-white shadow-xs"
                : "text-[#667085] hover:text-[#172B4D]"
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>
      </div>

      {/* ACTIVE ORDERS TAB */}
      {activeTab === "active" && (
        <div className="space-y-4 animate-scale-in">
          {activeOrders.length === 0 ? (
            <EmptyState
              icon={<OrdersIcon className="w-8 h-8 text-[#FF5A36]" />}
              title="No active orders"
              description="Your next delicious meal is just a few clicks away!"
              actionText="Browse Restaurants"
              actionLink="/"
            />
          ) : (
            activeOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8E5E1] rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#FF5A36]/40 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#FF5A36] bg-[#FFF8F1] px-2.5 py-0.5 rounded-lg border border-[#FF5A36]/20">
                      #{order.id}
                    </span>
                    <span className="bg-[#E8F8F1] text-[#16A36A] text-xs font-headline px-2.5 py-0.5 rounded-md">
                      ● {order.status}
                    </span>
                  </div>

                  <h3 className="font-headline text-lg text-[#172B4D]">
                    {order.restaurantName}
                  </h3>

                  <p className="text-xs text-[#667085] font-body">
                    {order.items.map((i) => `${i.name} (×${i.quantity})`).join(", ")}
                  </p>

                  <p className="text-xs font-subhead text-[#172B4D]">
                    Total: ₹{order.totalAmount} • {order.estimatedTime || "25 mins"}
                  </p>
                </div>

                <Link to={`/track/${order.id}`}>
                  <Button variant="primary" size="md">
                    <span className="flex items-center gap-1.5">
                      Track Order <DeliveryBikeIcon className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* PAST ORDERS TAB */}
      {activeTab === "past" && (
        <div className="space-y-4 animate-scale-in">
          {pastOrders.length === 0 ? (
            <EmptyState
              icon={<FoodDishIcon className="w-8 h-8 text-[#FF5A36]" />}
              title="No past orders yet"
              description="Once you place orders, you can view receipts and reorder items from here."
              actionText="Explore Restaurants"
              actionLink="/"
            />
          ) : (
            pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8E5E1] rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#667085]">
                      #{order.id}
                    </span>
                    <span className="bg-gray-100 text-[#667085] text-xs font-subhead px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckIcon className="w-3 h-3" /> {order.status}
                    </span>
                  </div>

                  <h3 className="font-headline text-lg text-[#172B4D]">
                    {order.restaurantName}
                  </h3>

                  <p className="text-xs text-[#667085] font-body">
                    {order.items.map((i) => `${i.name} (×${i.quantity})`).join(", ")}
                  </p>

                  <p className="text-xs font-subhead text-[#172B4D]">
                    Paid ₹{order.totalAmount} • {order.placedAt}
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleReorder(order)}
                >
                  <span className="flex items-center gap-1.5">
                    Reorder <RefreshIcon className="w-3.5 h-3.5 text-[#172B4D]" />
                  </span>
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
