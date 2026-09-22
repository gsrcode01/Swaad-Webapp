import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    activeOrders: [
      {
        id: "SW28471",
        restaurantName: "Sagar Ratna",
        items: [
          { name: "Masala Dosa", quantity: 1, price: 120 },
          { name: "Filter Coffee", quantity: 1, price: 60 },
        ],
        itemCount: 2,
        totalAmount: 196,
        status: "Preparing", // Confirmed, Preparing, Out for Delivery, Delivered
        placedAt: "Just now",
        estimatedTime: "20-25 mins",
        deliveryAddress: "Flat 402, Bellandur, Bengaluru",
        timeline: [
          { label: "Order Confirmed", time: "10:15 PM", completed: true },
          { label: "Preparing Food", time: "10:18 PM", completed: true },
          { label: "Out for Delivery", time: "10:30 PM", completed: false },
          { label: "Delivered", time: "10:45 PM", completed: false },
        ],
      },
    ],
    pastOrders: [
      {
        id: "SW28320",
        restaurantName: "The Biryani House",
        items: [
          { name: "Chicken Dum Biryani", quantity: 2, price: 480 },
          { name: "Gulab Jamun", quantity: 1, price: 80 },
        ],
        itemCount: 3,
        totalAmount: 620,
        status: "Delivered",
        placedAt: "Yesterday, 8:40 PM",
      },
    ],
  },
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: "SW" + Math.floor(10000 + Math.random() * 90000),
        placedAt: "Just now",
        status: "Confirmed",
        timeline: [
          { label: "Order Confirmed", time: "Just now", completed: true },
          { label: "Preparing Food", time: "In 5 mins", completed: false },
          { label: "Out for Delivery", time: "In 15 mins", completed: false },
          { label: "Delivered", time: "In 30 mins", completed: false },
        ],
        ...action.payload,
      };
      state.activeOrders.unshift(newOrder);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.activeOrders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        if (status === "Delivered") {
          state.activeOrders = state.activeOrders.filter((o) => o.id !== orderId);
          state.pastOrders.unshift(order);
        }
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
