import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import { selectAddress, addAddress } from "../../store/slices/userSlice";
import { placeOrder } from "../../store/slices/orderSlice";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import {
  CartBagIcon,
  LocationIcon,
  MobilePayIcon,
  WalletCardIcon,
  CashIcon,
  CheckIcon,
} from "../../components/common/Icons/Icons";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.items);
  const coupon = useSelector((store) => store.cart.coupon);
  const cookingNote = useSelector((store) => store.cart.cookingNote);
  const user = useSelector((store) => store.user);

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [selectedAddress, setSelectedAddress] = useState(user.selectedAddressId || "addr_1");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [newAddressInput, setNewAddressInput] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newTag, setNewTag] = useState("Other");

  if (!cartItems || cartItems.length === 0) {
    return (
      <EmptyState
        icon={<CartBagIcon className="w-8 h-8 text-[#FF5A36]" />}
        title="Your Cart is Empty"
        description="Add items from a restaurant menu before proceeding to checkout."
        actionText="Browse Restaurants"
        actionLink="/"
      />
    );
  }

  const itemTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      ((item.card?.info?.price || item.card?.info?.defaultPrice || item.price || 0) / 100) *
        (item.quantity || 1),
    0
  );

  const deliveryFee = itemTotal > 500 ? 0 : 30;
  const taxes = Math.round(itemTotal * 0.05);
  const discount = coupon ? (coupon.discount || 50) : 0;
  const grandTotal = Math.max(0, itemTotal + deliveryFee + taxes - discount);

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (newAddressInput.trim()) {
      dispatch(addAddress({ tag: newTag, detail: newAddressInput }));
      setNewAddressInput("");
      setShowAddressModal(false);
    }
  };

  const handlePlaceOrder = () => {
    const activeAddressObj = user.addresses.find((a) => a.id === selectedAddress);
    const orderData = {
      items: cartItems.map((item) => ({
        name: item.card?.info?.name || item.name,
        quantity: item.quantity || 1,
        price: (item.card?.info?.price || item.card?.info?.defaultPrice || 0) / 100,
      })),
      itemCount: cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0),
      totalAmount: grandTotal,
      restaurantName: "Sagar Ratna",
      deliveryAddress: activeAddressObj?.detail || "Indiranagar, Bengaluru",
      paymentMethod,
      cookingNote,
    };

    dispatch(placeOrder(orderData));
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Checkout Stepper Progress */}
      <div className="bg-white border border-[#E8E5E1] rounded-3xl p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between max-w-lg mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E8E5E1] -translate-y-1/2 z-0"></div>

          {/* Step 1 */}
          <button
            onClick={() => setStep(1)}
            className={`flex flex-col items-center gap-1 z-10 cursor-pointer ${
              step >= 1 ? "text-[#FF5A36]" : "text-[#667085]"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-headline text-xs border-2 transition-all ${
                step >= 1
                  ? "bg-[#FF5A36] text-white border-[#FF5A36]"
                  : "bg-white text-[#667085] border-[#E8E5E1]"
              }`}
            >
              1
            </div>
            <span className="text-xs font-subhead">Address</span>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => setStep(2)}
            className={`flex flex-col items-center gap-1 z-10 cursor-pointer ${
              step >= 2 ? "text-[#FF5A36]" : "text-[#667085]"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-headline text-xs border-2 transition-all ${
                step >= 2
                  ? "bg-[#FF5A36] text-white border-[#FF5A36]"
                  : "bg-white text-[#667085] border-[#E8E5E1]"
              }`}
            >
              2
            </div>
            <span className="text-xs font-subhead">Payment</span>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => setStep(3)}
            className={`flex flex-col items-center gap-1 z-10 cursor-pointer ${
              step === 3 ? "text-[#FF5A36]" : "text-[#667085]"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-headline text-xs border-2 transition-all ${
                step === 3
                  ? "bg-[#FF5A36] text-white border-[#FF5A36]"
                  : "bg-white text-[#667085] border-[#E8E5E1]"
              }`}
            >
              3
            </div>
            <span className="text-xs font-subhead">Review</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Active Step View */}
        <div className="lg:col-span-8 bg-white border border-[#E8E5E1] rounded-3xl p-6 sm:p-8 shadow-xs">
          {/* STEP 1: Address */}
          {step === 1 && (
            <div className="space-y-6 animate-scale-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-headline text-[#172B4D]">
                  Select Delivery Address
                </h2>
                <button
                  onClick={() => setShowAddressModal(!showAddressModal)}
                  className="text-xs text-[#FF5A36] font-subhead hover:underline cursor-pointer"
                >
                  + Add New Address
                </button>
              </div>

              {/* Add New Address Form */}
              {showAddressModal && (
                <form
                  onSubmit={handleAddNewAddress}
                  className="bg-[#FFF8F1] border border-[#FF5A36]/30 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex gap-2">
                    {["Home", "Work", "Other"].map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setNewTag(tag)}
                        className={`px-3 py-1 rounded-lg text-xs font-subhead cursor-pointer ${
                          newTag === tag
                            ? "bg-[#FF5A36] text-white"
                            : "bg-white text-[#172B4D] border border-[#E8E5E1]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newAddressInput}
                    onChange={(e) => setNewAddressInput(e.target.value)}
                    placeholder="Enter full street address, flat no, landmark..."
                    className="w-full bg-white border border-[#E8E5E1] rounded-xl p-3 text-xs font-subhead focus:outline-none focus:border-[#FF5A36]"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddressModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit">
                      Save Address
                    </Button>
                  </div>
                </form>
              )}

              {/* Address Radio Cards */}
              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedAddress === addr.id
                        ? "bg-[#FFF8F1] border-[#FF5A36] shadow-xs"
                        : "bg-white border-[#E8E5E1] hover:border-[#FF5A36]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryAddress"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="mt-1 accent-[#FF5A36]"
                    />
                    <div>
                      <span className="font-headline text-sm text-[#172B4D] flex items-center gap-1.5 mb-0.5">
                        <LocationIcon className="w-3.5 h-3.5 text-[#FF5A36]" /> {addr.tag}
                      </span>
                      <p className="text-xs text-[#667085] leading-relaxed font-body">
                        {addr.detail}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" onClick={() => setStep(2)}>
                  Continue to Payment →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6 animate-scale-in">
              <h2 className="text-xl font-headline text-[#172B4D]">
                Choose Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { id: "UPI", name: "UPI / Google Pay / PhonePe", icon: <MobilePayIcon className="w-5 h-5 text-[#FF5A36]" /> },
                  { id: "Card", name: "Credit / Debit Card", icon: <WalletCardIcon className="w-5 h-5 text-[#16A36A]" /> },
                  { id: "COD", name: "Cash on Delivery", icon: <CashIcon className="w-5 h-5 text-blue-500" /> },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? "bg-[#FFF8F1] border-[#FF5A36] shadow-xs"
                        : "bg-white border-[#E8E5E1] hover:border-[#FF5A36]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.id}
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                      className="accent-[#FF5A36]"
                    />
                    <div className="w-9 h-9 rounded-xl bg-[#FCFAF7] border border-[#E8E5E1] flex items-center justify-center">
                      {pm.icon}
                    </div>
                    <span className="font-subhead text-sm text-[#172B4D]">
                      {pm.name}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  ← Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)}>
                  Review Order →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Confirmation */}
          {step === 3 && (
            <div className="space-y-6 animate-scale-in">
              <h2 className="text-xl font-headline text-[#172B4D]">
                Review Your Order
              </h2>

              {/* Selected Details summary */}
              <div className="bg-[#FCFAF7] border border-[#E8E5E1] rounded-2xl p-4 space-y-3 text-xs font-subhead">
                <div className="flex justify-between">
                  <span className="text-[#667085]">Deliver To:</span>
                  <span className="font-bold text-[#172B4D] max-w-[240px] text-right truncate">
                    {user.addresses.find((a) => a.id === selectedAddress)?.detail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Payment Method:</span>
                  <span className="font-bold text-[#172B4D]">{paymentMethod}</span>
                </div>
                {cookingNote && (
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Cooking Note:</span>
                    <span className="font-bold text-[#172B4D]">{cookingNote}</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E8E5E1]">
                {cartItems.map((item) => {
                  const info = item.card?.info || item;
                  const price = (info.price || info.defaultPrice || 0) / 100;
                  return (
                    <div key={info.id} className="py-2.5 flex justify-between text-xs font-subhead">
                      <span className="text-[#172B4D]">
                        {info.name} × {item.quantity || 1}
                      </span>
                      <span className="font-bold text-[#172B4D]">
                        ₹{price * (item.quantity || 1)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Button variant="outline" onClick={() => setStep(2)}>
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="px-8"
                  onClick={handlePlaceOrder}
                >
                  Place Order • ₹{grandTotal.toFixed(2)}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Bill Breakdown Card */}
        <div className="lg:col-span-4 bg-white border border-[#E8E5E1] rounded-3xl p-6 shadow-xs h-fit space-y-4">
          <h3 className="font-headline text-base text-[#172B4D] pb-3 border-b border-[#E8E5E1]">
            Bill Summary
          </h3>

          <div className="space-y-2.5 text-xs text-[#667085] font-subhead">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="text-[#172B4D] font-bold">₹{itemTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Partner Fee</span>
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
              <span className="text-[#172B4D] font-bold">₹{taxes}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-[#16A36A] font-bold">
                <span>Discount ({coupon.code})</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-[#E8E5E1] text-base font-headline text-[#172B4D]">
              <span>To Pay</span>
              <span className="text-[#FF5A36]">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
