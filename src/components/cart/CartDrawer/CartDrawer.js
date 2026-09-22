import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  decreaseItemQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  setCookingNote,
} from "../../../store/slices/cartSlice";
import { setCartDrawerOpen } from "../../../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import {
  CartBagIcon,
  CloseIcon,
  FoodDishIcon,
  CheckIcon,
} from "../../common/Icons/Icons";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((store) => store.ui.cartDrawerOpen);
  const cartItems = useSelector((store) => store.cart.items);
  const coupon = useSelector((store) => store.cart.coupon);
  const cookingNote = useSelector((store) => store.cart.cookingNote);

  const [inputCoupon, setInputCoupon] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  if (!isOpen) return null;

  const itemTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      ((item.card?.info?.price || item.card?.info?.defaultPrice || item.price || 0) / 100) *
        (item.quantity || 1),
    0
  );

  const deliveryFee = itemTotal > 0 ? (itemTotal > 500 ? 0 : 30) : 0;
  const taxes = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0;
  const discount = coupon ? (coupon.discount || 50) : 0;
  const grandTotal = Math.max(0, itemTotal + deliveryFee + taxes - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim().toUpperCase() === "SWAAD50") {
      dispatch(applyCoupon({ code: "SWAAD50", discount: 50 }));
      setInputCoupon("");
    } else if (inputCoupon.trim()) {
      alert("Invalid coupon code! Try 'SWAAD50'");
    }
  };

  const handleCheckout = () => {
    dispatch(setCartDrawerOpen(false));
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setCartDrawerOpen(false))}
      ></div>

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-[#E8E5E1] flex items-center justify-between bg-[#FCFAF7]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF8F1] border border-[#FF5A36]/20 flex items-center justify-center text-[#FF5A36]">
                <CartBagIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-headline text-base text-[#172B4D]">
                  Your Cart
                </h3>
                <span className="text-xs text-[#667085] font-body">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs text-[#E94B2F] font-subhead hover:underline cursor-pointer px-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => dispatch(setCartDrawerOpen(false))}
                className="w-8 h-8 rounded-xl bg-white border border-[#E8E5E1] text-[#667085] hover:text-[#172B4D] flex items-center justify-center cursor-pointer transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FFF8F1] border border-[#FF5A36]/20 text-[#FF5A36] flex items-center justify-center mx-auto mb-4">
                  <FoodDishIcon className="w-8 h-8" />
                </div>
                <h4 className="font-headline text-base text-[#172B4D] mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs text-[#667085] mb-6 font-body">
                  Good food is waiting. Add your favorite dishes from the menu!
                </p>
                <Button
                  variant="primary"
                  onClick={() => dispatch(setCartDrawerOpen(false))}
                >
                  Browse Menu
                </Button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="divide-y divide-[#E8E5E1]">
                  {cartItems.map((item) => {
                    const info = item.card?.info || item;
                    const price = (info.price || info.defaultPrice || 0) / 100;
                    return (
                      <div
                        key={info.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-subhead text-sm text-[#172B4D] truncate">
                            {info.name}
                          </p>
                          <p className="text-xs font-bold text-[#667085]">
                            ₹{price}
                          </p>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 bg-[#FFF8F1] border border-[#FF5A36]/40 rounded-lg px-2 py-1">
                          <button
                            onClick={() =>
                              dispatch(decreaseItemQuantity(info.id))
                            }
                            className="text-[#FF5A36] font-bold text-sm px-1.5 cursor-pointer hover:scale-110 active:scale-95"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold text-[#172B4D] min-w-4 text-center font-subhead">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => dispatch(addItem(item))}
                            className="text-[#FF5A36] font-bold text-sm px-1.5 cursor-pointer hover:scale-110 active:scale-95"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-headline text-sm text-[#172B4D] min-w-14 text-right">
                          ₹{price * (item.quantity || 1)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Cooking Note */}
                <div className="bg-[#FCFAF7] border border-[#E8E5E1] rounded-xl p-3 text-xs">
                  {noteOpen ? (
                    <div>
                      <label className="font-headline text-[#172B4D] block mb-1">
                        Cooking Instructions:
                      </label>
                      <input
                        type="text"
                        value={cookingNote}
                        onChange={(e) =>
                          dispatch(setCookingNote(e.target.value))
                        }
                        placeholder="e.g. Less spicy, extra sauce..."
                        className="w-full bg-white border border-[#E8E5E1] rounded-lg p-2 text-xs font-subhead focus:outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setNoteOpen(true)}
                      className="text-[#667085] hover:text-[#FF5A36] font-subhead flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>+</span> Add cooking instructions...
                    </button>
                  )}
                </div>

                {/* Coupon Box */}
                <div className="bg-[#FFF8F1] border border-[#FF5A36]/30 rounded-xl p-3 text-xs">
                  {coupon ? (
                    <div className="flex items-center justify-between">
                      <span className="font-subhead text-[#16A36A] flex items-center gap-1">
                        <CheckIcon className="w-3.5 h-3.5" /> {coupon.code} applied (-₹{coupon.discount})
                      </span>
                      <button
                        onClick={() => dispatch(removeCoupon())}
                        className="text-xs text-[#E94B2F] font-subhead cursor-pointer hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleApplyCoupon}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="Enter coupon (e.g. SWAAD50)"
                        className="flex-1 bg-white border border-[#E8E5E1] rounded-lg px-2.5 py-1.5 text-xs uppercase font-subhead focus:outline-none focus:border-[#FF5A36]"
                      />
                      <button
                        type="submit"
                        className="bg-[#FF5A36] text-white font-subhead px-3 py-1.5 rounded-lg hover:bg-[#E94B2F] cursor-pointer transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="border-t border-[#E8E5E1] pt-3 space-y-2 text-xs text-[#667085] font-subhead">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="text-[#172B4D] font-bold">
                      ₹{itemTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-[#172B4D] font-bold">
                      {deliveryFee === 0 ? (
                        <span className="text-[#16A36A]">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Charges (5%)</span>
                    <span className="text-[#172B4D] font-bold">
                      ₹{taxes}
                    </span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-[#16A36A] font-bold">
                      <span>Discount ({coupon.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[#E8E5E1] text-sm font-headline text-[#172B4D]">
                    <span>To Pay</span>
                    <span className="text-[#FF5A36]">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-[#E8E5E1] bg-[#FCFAF7]">
              <Button
                variant="primary"
                size="lg"
                className="w-full flex justify-between items-center px-6"
                onClick={handleCheckout}
              >
                <span>Proceed to Checkout</span>
                <span>₹{grandTotal.toFixed(2)} →</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
