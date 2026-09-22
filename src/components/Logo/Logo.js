import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ showTagline = true, size = "normal" }) => {
  return (
    <Link to="/" className="flex items-center gap-3 group text-inherit no-underline select-none">
      {/* Luxury Monogram Emblem */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#FF5A36] via-[#E94B2F] to-[#172B4D] p-0.5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
        <div className="w-full h-full bg-[#FCFAF7] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle geometric pattern glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF8F1] to-white opacity-80"></div>

          {/* Luxury 'S' Monogram with Botanical Accent */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF5A36] relative z-10 transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant stylized S curve */}
            <path
              d="M22 10C22 7.79 19.31 6 16 6C12.69 6 10 7.79 10 10C10 13.5 22 13 22 18C22 20.76 19.31 23 16 23C12.69 23 10 21 10 19"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Golden-Green Leaf Crest */}
            <path
              d="M22 6C20 4 17 4.5 17 4.5C17 4.5 17.5 7.5 19.5 9.5C21.5 11.5 24.5 11 24.5 11C24.5 11 24 8 22 6Z"
              fill="#16A36A"
            />
          </svg>
        </div>
      </div>

      {/* Premium Wordmark & Micro Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className="text-2xl sm:text-3xl font-black tracking-tight text-[#172B4D] leading-none transition-colors group-hover:text-[#FF5A36]"
            style={{ fontFamily: "'Gilroy', 'Plus Jakarta Sans', sans-serif" }}
          >
            Swaad
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] mb-1"></span>
        </div>

        {showTagline && (
          <span
            className="text-[10px] font-medium text-[#667085] tracking-wider uppercase -mt-0.5 hidden sm:block"
            style={{ fontFamily: "'Gilroy', 'Plus Jakarta Sans', sans-serif" }}
          >
            Taste the better side of life
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
