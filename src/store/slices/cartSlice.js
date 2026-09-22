import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // [{ ...item, quantity: 1 }]
    restaurant: null, // active restaurant metadata
    cookingNote: "",
    coupon: null, // { code: "SWAAD50", discount: 50 }
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const itemId = item.card?.info?.id || item.id;
      const existingIndex = state.items.findIndex(
        (i) => (i.card?.info?.id || i.id) === itemId
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity =
          (state.items[existingIndex].quantity || 1) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    decreaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const existingIndex = state.items.findIndex(
        (i) => (i.card?.info?.id || i.id) === itemId
      );

      if (existingIndex >= 0) {
        if (state.items[existingIndex].quantity > 1) {
          state.items[existingIndex].quantity -= 1;
        } else {
          state.items.splice(existingIndex, 1);
        }
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      if (itemId) {
        state.items = state.items.filter(
          (i) => (i.card?.info?.id || i.id) !== itemId
        );
      } else {
        state.items.pop();
      }
    },
    setCookingNote: (state, action) => {
      state.cookingNote = action.payload;
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    removeCoupon: (state) => {
      state.coupon = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.cookingNote = "";
      state.coupon = null;
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const {
  addItem,
  decreaseItemQuantity,
  removeItem,
  setCookingNote,
  applyCoupon,
  removeCoupon,
  clearCart,
  setRestaurant,
} = cartSlice.actions;

export default cartSlice.reducer;
