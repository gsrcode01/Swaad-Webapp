import React from "react";
import User from "../../components/User/User";
import UserClass from "../../components/UserClass/UserClass";
import { SparklesIcon, HeartIcon } from "../../components/common/Icons/Icons";

const About = () => {
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto space-y-8">
      {/* Brand Story Banner */}
      <div className="bg-gradient-to-br from-[#FFF8F1] via-white to-[#FFF8F1] border border-[#E8E5E1] rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8F1] border border-[#FF5A36]/20 text-[#FF5A36] text-xs font-bold uppercase tracking-wider font-subhead mb-4">
          <SparklesIcon className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span>Our Culinary Mission</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-headline text-[#172B4D] mb-3">
          About <span className="text-[#FF5A36]">Swaad</span>
        </h1>
        <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-2xl font-body">
          Swaad is built with a singular obsession: delivering the finest culinary experiences from kitchen to doorstep in minutes. Taste the better side of life with authentic recipes, real-time live tracking, and seamless ordering.
        </p>
      </div>

      {/* Engineering & Team Showcase */}
      <div>
        <h2 className="text-xl sm:text-2xl font-headline text-[#172B4D] mb-4">
          Leadership & Engineering
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <User name="Girdhar (Lead Engineer)" />
          <UserClass name="Girdhar (System Architect)" />
        </div>
      </div>
    </div>
  );
};

export default About;
