import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Girdhar",
    email: "girdhar@swaad.com",
    phone: "+91 98765 43210",
    addresses: [
      {
        id: "addr_1",
        tag: "Home",
        detail: "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
        isDefault: true,
      },
      {
        id: "addr_2",
        tag: "Work",
        detail: "Tower B, Cyber Park, Electronic City, Bengaluru",
        isDefault: false,
      },
    ],
    selectedAddressId: "addr_1",
    favorites: [], // [restaurantId]
  },
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push({
        id: "addr_" + Date.now(),
        ...action.payload,
        isDefault: false,
      });
    },
    toggleFavorite: (state, action) => {
      const resId = action.payload;
      if (state.favorites.includes(resId)) {
        state.favorites = state.favorites.filter((id) => id !== resId);
      } else {
        state.favorites.push(resId);
      }
    },
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { selectAddress, addAddress, toggleFavorite, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;
