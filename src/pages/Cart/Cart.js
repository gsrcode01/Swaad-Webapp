import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemList from "../../components/ItemList/ItemList";
import { clearCart } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { CartBagIcon, FoodDishIcon } from "../../components/common/Icons/Icons";
import EmptyState from "../../components/common/EmptyState/EmptyState";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      (item?.card?.info?.price
        ? item.card.info.price / 100
        : (item?.card?.info?.defaultPrice || 0) / 100),
    0
  );

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white border border-[#E8E5E1] rounded-3xl shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E5E1]">
        <div className="flex items-center gap-2">
          <CartBagIcon className="w-6 h-6 text-[#FF5A36]" />
          <h1 className="text-2xl font-headline text-[#172B4D]">Your Cart</h1>
        </div>
        {cartItems?.length > 0 && (
          <button
            className="px-3.5 py-1.5 text-xs font-subhead rounded-xl bg-[#FCFAF7] border border-[#E8E5E1] text-[#E94B2F] hover:bg-[#E94B2F] hover:text-white cursor-pointer transition-colors"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className="mt-4">
        {cartItems?.length === 0 ? (
          <EmptyState
            icon={<CartBagIcon className="w-8 h-8 text-[#FF5A36]" />}
            title="Your cart is empty"
            description="Looks like you haven't added any dishes to your cart yet. Explore best culinary experiences near you."
            actionText="Explore Restaurants"
            actionLink="/"
          />
        ) : (
          <div>
            <ItemList items={cartItems} />

            {/* Bill Summary */}
            <div className="mt-6 pt-4 border-t border-[#E8E5E1] flex justify-between items-center font-subhead">
              <span className="text-base text-[#172B4D]">
                To Pay ({cartItems.length} items):
              </span>
              <span className="font-headline text-xl text-[#FF5A36]">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
