import Link from "next/link";
import { useState } from "react";
import { ShoppingCart32, AddAlt32, SubtractAlt32 } from "@carbon/icons-react";

import { useCart, useDispatchCart } from "./cart-context";

const Cart = () => {
  const [showCartItems, setShowCartItems] = useState(false);
  const state = useCart();
  const dispatch = useDispatchCart();
  const handleRemoveItem = (id) => {
    dispatch({
      type: "REMOVE",
      payload: {
        id,
      },
    });
  };
  const handleAdjustQuantity = (id, action) => {
    dispatch({
      type: action,
      payload: {
        id,
      },
    });
  };

  let sumTotal, itemCount;
  if (state) {
    sumTotal = state.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    itemCount = state.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  return (
    <>
      <div className="sticky w-full md:w-20 bottom-0 flex items-center md:items-end left-0 mb-20 ml-0 flex-col md:flex-row md:ml-10  right-0">
        <div
          onClick={() => setShowCartItems((prev) => !prev)}
          className={`cursor-pointer w-12 h-12 flex-col shadow-3xl p-2 border-2 flex justify-center order-2 md:order-1 items-center mb-6 rounded-full ${
            showCartItems
              ? "bg-blue-600 border-white text-white"
              : "bg-white border-blue-700 text-blue-700"
          }`}
        >
          {state && state.length > 0 && (
            <div className="absolute mb-6 bottom-0 text-blue-600 bg-white ml-10 rounded-full border-2 border-blue-600 text-center w-5 h-5 text-xs">
              {state.reduce((acc, curr) => acc + curr.quantity, 0)}
            </div>
          )}
          <ShoppingCart32 className="mx-auto my-0" />
        </div>
        <div
          className={`text-center bg-white rounded-lg pt-10 pb-4 px-4 flex flex-col items-center justify-start w-auto md:ml-4 mb-2 md:mb-6 bg-opacity-90 border border-blue-400 order-1 md:order-2 ${
            showCartItems ? "visible" : "invisible"
          }`}
        >
          <div
            className="border-b border-gray-500 tracking-wide absolute top-0 pt-2 text-sm"
            style={{ width: "max-content" }}
          >
            Your Shopping Cart
          </div>
          {state && state.length === 0 ? (
            <div className="w-48">
              Your cart is empty. Add an item and check back here later.
            </div>
          ) : (
            state && (
              <div className="flex w-64 justify-end flex-wrap">
                {state.map((myCartItem) => (
                  <div
                    key={myCartItem.id}
                    className="mb-2 w-full flex-wrap flex justify-between items-center border-b border-gray-400 bg-blue-100 p-1 bg-opacity-25"
                  >
                    <div
                      className="w-full flex items-center"
                      style={{ width: "max-content" }}
                    >
                      <span
                        className="cursor-pointer text-gray-700 text-xs hover:underline"
                        onClick={() => handleRemoveItem(myCartItem.id)}
                      >
                        X
                      </span>
                      <span className="text-left hover:text-blue-900 mx-2 underline ml-4">
                        <Link
                          as={`/products/${myCartItem.slug}`}
                          href="/products/[slug]"
                        >
                          {myCartItem.item}
                        </Link>
                      </span>
                    </div>
                    <div className="w-full flex  py-1 justify-between">
                      <span className="w-3/4 text-base justify-start flex items-center font-light text-left">
                        <button
                          onClick={() =>
                            handleAdjustQuantity(myCartItem.id, "DECREASE")
                          }
                          className={`focus:outline-none  ${myCartItem.quantity === 1 && 'text-gray-300'}`}
                          disabled={myCartItem.quantity === 1 ? true : false}
                        >
                          <SubtractAlt32 className="w-4 h-4" />
                        </button>
                        <span className="mx-2">

                        {myCartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleAdjustQuantity(myCartItem.id, "INCREASE")
                          }
                          className={`focus:outline-none `}
                        >
                          <AddAlt32 className="w-4 h-4" />
                        </button>
                      </span>
                      <span className="w-1/4 text-right">
                        {myCartItem.price} :-
                      </span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex justify-between w-full items-end">
                  <span className="w-2/3 text-sm">
                    Total {itemCount > 0 && itemCount} items
                  </span>
                  <span className="w-1/3 text-right">
                    {sumTotal > 0 && sumTotal} :-
                  </span>
                </div>
                <div className="w-full text-right mt-2 text-sm cursor-pointer text-gray-700">
                  <span className="border-b border-gray-600 border-dashed hover:text-black hover:border-gray-800">
                    checkout
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
