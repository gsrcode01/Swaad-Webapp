import React from "react";
import Header from "../Header/Header";
import MobileBottomNav from "../MobileBottomNav/MobileBottomNav";
import Footer from "../Footer/Footer";
import CartDrawer from "../../cart/CartDrawer/CartDrawer";
import FloatingCart from "../../cart/FloatingCart/FloatingCart";
import { Outlet } from "react-router-dom";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-[#172B4D]">
      {/* Sticky Top Header with Integrated Nav */}
      <Header />

      {/* Main Content Area - Generous Full-Width Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-12">
        <Outlet />
      </main>

      {/* Global Cart Drawer */}
      <CartDrawer />

      {/* Floating Bottom Cart Bar */}
      <FloatingCart />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppShell;
