import React from "react";
import { Link } from "react-router-dom";
import { SparklesIcon } from "../../common/Icons/Icons";

const OffersBanner = () => {
  return (
    <section className="bg-gradient-to-r from-[#FF5A36] to-[#E94B2F] text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Decorative shapes */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

      <div className="space-y-2 text-center sm:text-left z-10">
        <span className="bg-white/20 text-white text-xs font-headline uppercase px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-1">
          <SparklesIcon className="w-3.5 h-3.5" /> Special Deal
        </span>
        <h3 className="text-2xl sm:text-3xl font-headline leading-tight">
          Flat 50% OFF on your first order
        </h3>
        <p className="text-white/90 text-xs sm:text-sm font-body">
          Use code <strong className="bg-white text-[#FF5A36] px-2 py-0.5 rounded font-mono font-bold">SWAAD50</strong> at checkout. Valid on orders above ₹199.
        </p>
      </div>

      <Link
        to="/offers"
        className="bg-white text-[#FF5A36] hover:bg-[#FFF8F1] px-6 py-3 rounded-xl font-headline text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap z-10"
      >
        View All Deals →
      </Link>
    </section>
  );
};

export default OffersBanner;
