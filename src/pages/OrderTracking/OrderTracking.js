import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/slices/orderSlice";
import Button from "../../components/common/Button/Button";
import {
  CheckIcon,
  ChefHatIcon,
  DeliveryBikeIcon,
  SparklesIcon,
  LightningIcon,
  StoreIcon,
  LocationIcon,
  PhoneIcon,
} from "../../components/common/Icons/Icons";

const OrderTracking = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const activeOrders = useSelector((store) => store.orders.activeOrders);
  const pastOrders = useSelector((store) => store.orders.pastOrders);

  const order =
    activeOrders.find((o) => o.id === orderId) ||
    pastOrders.find((o) => o.id === orderId) ||
    activeOrders[0];

  const [currentStage, setCurrentStage] = useState(1); // 0: Confirmed, 1: Preparing, 2: Out for Delivery, 3: Delivered

  useEffect(() => {
    if (order?.status === "Delivered") setCurrentStage(3);
    else if (order?.status === "Out for Delivery") setCurrentStage(2);
    else if (order?.status === "Preparing") setCurrentStage(1);
    else setCurrentStage(0);
  }, [order?.status]);

  const stages = [
    { label: "Order Confirmed", desc: "Your order has been received by kitchen", icon: <CheckIcon className="w-4 h-4" /> },
    { label: "Food Being Prepared", desc: "Chef is cooking your fresh meal", icon: <ChefHatIcon className="w-4 h-4" /> },
    { label: "Out for Delivery", desc: "Rider is heading to your doorstep", icon: <DeliveryBikeIcon className="w-4 h-4" /> },
    { label: "Delivered", desc: "Enjoy your delicious Swaad meal!", icon: <SparklesIcon className="w-4 h-4" /> },
  ];

  const handleNextStage = () => {
    const nextStage = Math.min(3, currentStage + 1);
    setCurrentStage(nextStage);
    const statusNames = ["Confirmed", "Preparing", "Out for Delivery", "Delivered"];
    if (order) {
      dispatch(updateOrderStatus({ orderId: order.id, status: statusNames[nextStage] }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 animate-scale-in">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E8E5E1] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {/* Animated Success Checkmark */}
          <div className="w-16 h-16 rounded-2xl bg-[#E8F8F1] text-[#16A36A] flex items-center justify-center shadow-inner">
            <CheckIcon className="w-8 h-8 text-[#16A36A]" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-headline text-[#172B4D]">
                Order #{order?.id || orderId}
              </h1>
              <span className="bg-[#FFF8F1] text-[#FF5A36] text-xs font-headline px-2.5 py-0.5 rounded-full border border-[#FF5A36]/30">
                {order?.restaurantName || "Sagar Ratna"}
              </span>
            </div>
            <p className="text-xs text-[#667085] mt-1 font-body">
              Estimated Delivery in <strong className="text-[#172B4D] font-subhead">20–25 minutes</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/orders">
            <Button variant="outline" size="sm">
              All Orders
            </Button>
          </Link>
          {currentStage < 3 && (
            <Button variant="secondary" size="sm" onClick={handleNextStage}>
              <span className="flex items-center gap-1">
                Simulate Next Status <LightningIcon className="w-3.5 h-3.5 text-[#FF5A36]" />
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: Timeline + Live Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 4-Stage Interactive Timeline */}
        <div className="lg:col-span-6 bg-white border border-[#E8E5E1] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="font-headline text-base text-[#172B4D] pb-3 border-b border-[#E8E5E1]">
            Delivery Progress
          </h3>

          <div className="space-y-6 relative">
            {stages.map((st, idx) => {
              const isDone = idx <= currentStage;
              const isCurrent = idx === currentStage;

              return (
                <div key={st.label} className="flex items-start gap-4 relative">
                  {/* Step Connector Line */}
                  {idx < stages.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px transition-colors ${
                        idx < currentStage ? "bg-[#16A36A]" : "bg-[#E8E5E1]"
                      }`}
                      style={{ height: "calc(100% + 8px)" }}
                    ></div>
                  )}

                  {/* Step Icon Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs z-10 transition-all ${
                      isDone
                        ? "bg-[#16A36A] text-white shadow-xs"
                        : "bg-white border-2 border-[#E8E5E1] text-[#667085]"
                    } ${isCurrent ? "ring-4 ring-[#E8F8F1]" : ""}`}
                  >
                    {isDone ? st.icon : <span className="font-subhead">{idx + 1}</span>}
                  </div>

                  <div>
                    <h4
                      className={`font-subhead text-sm ${
                        isDone ? "text-[#172B4D] font-bold" : "text-[#667085]"
                      }`}
                    >
                      {st.label}
                    </h4>
                    <p className="text-xs text-[#667085] mt-0.5 leading-relaxed font-body">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Simulated Map with Rider Animation */}
        <div className="lg:col-span-6 bg-white border border-[#E8E5E1] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-headline text-base text-[#172B4D]">
            Live Delivery Route
          </h3>

          <div className="h-64 sm:h-72 w-full bg-[#FCFAF7] border border-[#E8E5E1] rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* Map Roads Vector Simulation */}
            <svg className="w-full h-full opacity-30" viewBox="0 0 300 200">
              <path
                d="M 30 170 Q 150 120 270 30"
                stroke="#FF5A36"
                strokeWidth="6"
                strokeDasharray="8,8"
                fill="none"
              />
              <path d="M 0 100 L 300 100" stroke="#E8E5E1" strokeWidth="4" />
              <path d="M 150 0 L 150 200" stroke="#E8E5E1" strokeWidth="4" />
            </svg>

            {/* Restaurant Marker */}
            <div className="absolute top-6 right-8 flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-white shadow-md border border-[#172B4D]/20 flex items-center justify-center text-[#172B4D]">
                <StoreIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-subhead text-[#172B4D] bg-white px-2 py-0.5 rounded shadow-xs mt-1 border border-[#E8E5E1]">
                {order?.restaurantName || "Kitchen"}
              </span>
            </div>

            {/* Customer Home Marker */}
            <div className="absolute bottom-6 left-8 flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl bg-[#16A36A] text-white shadow-md flex items-center justify-center">
                <LocationIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-subhead text-[#172B4D] bg-white px-2 py-0.5 rounded shadow-xs mt-1 border border-[#E8E5E1]">
                Your Address
              </span>
            </div>

            {/* Moving Delivery Rider Marker */}
            <div
              className="absolute transition-all duration-700 flex flex-col items-center animate-float"
              style={{
                top:
                  currentStage === 0
                    ? "25%"
                    : currentStage === 1
                    ? "40%"
                    : currentStage === 2
                    ? "60%"
                    : "70%",
                left:
                  currentStage === 0
                    ? "70%"
                    : currentStage === 1
                    ? "50%"
                    : currentStage === 2
                    ? "35%"
                    : "25%",
              }}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FF5A36] text-white shadow-lg flex items-center justify-center animate-pulse">
                <DeliveryBikeIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-headline text-white bg-[#172B4D] px-2 py-0.5 rounded shadow-xs mt-1">
                Rider Rajesh
              </span>
            </div>
          </div>

          <div className="bg-[#FFF8F1] border border-[#FF5A36]/20 rounded-2xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-[#FF5A36] border border-[#FF5A36]/20 flex items-center justify-center shadow-xs">
                <PhoneIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-subhead text-[#172B4D] font-bold">Delivery Partner: Rajesh K.</p>
                <p className="text-[#667085] text-[11px] font-body">Vaccinated • Temperature 98.4°F</p>
              </div>
            </div>
            <a
              href="tel:+919876543210"
              className="bg-[#FF5A36] text-white font-subhead text-xs px-3 py-1.5 rounded-xl hover:bg-[#E94B2F] transition-colors"
            >
              Call Rider
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
