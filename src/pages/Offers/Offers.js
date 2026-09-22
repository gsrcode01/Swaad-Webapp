import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "../../store/slices/cartSlice";
import { setCartDrawerOpen } from "../../store/slices/uiSlice";
import Button from "../../components/common/Button/Button";
import { SparklesIcon, LightningIcon, StarIcon, CheckIcon } from "../../components/common/Icons/Icons";

const Offers = () => {
  const dispatch = useDispatch();
  const [copiedCode, setCopiedCode] = useState(null);

  const coupons = [
    {
      code: "SWAAD50",
      title: "50% OFF on your first order",
      desc: "Maximum discount ₹50 on minimum order value of ₹199.",
      discount: 50,
      badge: "MOST POPULAR",
      icon: <SparklesIcon className="w-5 h-5 text-[#FF5A36]" />,
      badgeBg: "bg-[#FFF8F1] text-[#FF5A36] border-[#FF5A36]/20",
    },
    {
      code: "FREEDEL",
      title: "Free Delivery on orders above ₹299",
      desc: "No delivery charges on standard distance deliveries.",
      discount: 30,
      badge: "NO DELIVERY FEE",
      icon: <LightningIcon className="w-5 h-5 text-blue-500" />,
      badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      code: "TASTE20",
      title: "Flat 20% Instant Discount",
      desc: "Save up to ₹75 on select partner restaurants.",
      discount: 75,
      badge: "PARTNER EXCLUSIVE",
      icon: <StarIcon className="w-5 h-5 text-emerald-500" filled={true} />,
      badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  ];

  const handleApply = (coupon) => {
    dispatch(applyCoupon({ code: coupon.code, discount: coupon.discount }));
    setCopiedCode(coupon.code);
    setTimeout(() => {
      dispatch(setCartDrawerOpen(true));
      setCopiedCode(null);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-headline text-[#172B4D]">Offers & Deals</h1>
        <p className="text-xs text-[#667085] font-body">
          Apply exclusive discount coupons directly to your order
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="bg-white border border-[#E8E5E1] rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-[#FF5A36]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCFAF7] border border-[#E8E5E1] flex items-center justify-center">
                  {c.icon}
                </div>
                <span className={`text-[10px] font-headline px-2.5 py-0.5 rounded-full border uppercase ${c.badgeBg}`}>
                  {c.badge}
                </span>
              </div>

              <h3 className="font-headline text-base text-[#172B4D] mb-1">
                {c.title}
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed font-body">
                {c.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E5E1] flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#FF5A36] bg-[#FFF8F1] border border-dashed border-[#FF5A36] px-3 py-1 rounded-lg">
                {c.code}
              </span>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleApply(c)}
              >
                {copiedCode === c.code ? (
                  <span className="flex items-center gap-1">
                    <CheckIcon className="w-3.5 h-3.5" /> Applied
                  </span>
                ) : (
                  "Apply Code"
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
