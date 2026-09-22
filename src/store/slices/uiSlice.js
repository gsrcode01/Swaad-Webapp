import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartDrawerOpen: false,
    mobileNavOpen: false,
    selectedLocation: "Indiranagar, Bengaluru",
    searchQuery: "",
    selectedCuisineFilter: null,
  },
  reducers: {
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    setCartDrawerOpen: (state, action) => {
      state.cartDrawerOpen = action.payload;
    },
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    setLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCuisineFilter: (state, action) => {
      state.selectedCuisineFilter = action.payload;
    },
  },
});

export const {
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleMobileNav,
  setLocation,
  setSearchQuery,
  setCuisineFilter,
} = uiSlice.actions;

export default uiSlice.reducer;
