import React from "react";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E8E5E1] mt-16 pb-20 lg:pb-8 pt-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Logo showTagline={true} />
          <p className="text-xs text-[#667085] leading-relaxed pt-2">
            Order fresh meals, groceries, and delicacies directly from top-rated kitchens in your city.
          </p>
          <p className="text-xs text-[#667085]">
            © {new Date().getFullYear()} Swaad Technologies Ltd.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[#172B4D] mb-3">Company</h4>
          <ul className="space-y-2 text-xs text-[#667085]">
            <li><Link to="/about" className="hover:text-[#FF5A36]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#FF5A36]">Team & Careers</Link></li>
            <li><Link to="/grocery" className="hover:text-[#FF5A36]">Swaad Grocery</Link></li>
            <li><Link to="/offers" className="hover:text-[#FF5A36]">Offers & Coupons</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[#172B4D] mb-3">Contact</h4>
          <ul className="space-y-2 text-xs text-[#667085]">
            <li><Link to="/contact" className="hover:text-[#FF5A36]">Help & Support</Link></li>
            <li><Link to="/contact" className="hover:text-[#FF5A36]">Partner with us</Link></li>
            <li><span>support@swaad.com</span></li>
            <li><span>Bengaluru, Karnataka, India</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm text-[#172B4D] mb-3">Legal</h4>
          <ul className="space-y-2 text-xs text-[#667085]">
            <li><span className="hover:text-[#FF5A36] cursor-pointer">Terms & Conditions</span></li>
            <li><span className="hover:text-[#FF5A36] cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-[#FF5A36] cursor-pointer">Cookie Policy</span></li>
            <li><span className="hover:text-[#FF5A36] cursor-pointer">Security</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
