// Mock order service for handling order placement and state tracking
export const generateOrderId = () => {
  return "SW" + Math.floor(10000 + Math.random() * 90000);
};

export const createMockOrder = ({ items, totalAmount, restaurant, address, paymentMethod }) => {
  return {
    id: generateOrderId(),
    restaurantName: restaurant?.name || "Swaad Kitchen",
    items: items || [],
    itemCount: items?.length || 0,
    totalAmount: totalAmount || 0,
    address: address || "Home, 4th Cross, Indiranagar, Bengaluru",
    paymentMethod: paymentMethod || "UPI",
    placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: "Confirmed", // Confirmed -> Preparing -> Out for Delivery -> Delivered
    estimatedTime: "25-30 mins",
  };
};
