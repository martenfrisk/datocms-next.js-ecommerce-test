import Link from "next/link";
import { useState, useContext } from "react";
import { ShoppingCart32, AddAlt16, SubtractAlt16, TrashCan16 } from "@carbon/icons-react";

import { useCart, useDispatchCart } from "./cart-context";

const Cart = () => {
  const [showCartItems, setShowCartItems] = useState(false);
  const { state, showCart } = useCart();
  const [ visible, setVisible ] = showCart
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
  const handleRemoveAll = () => {
    dispatch({
      type: "CLEAR",
    });
  };
  let sumTotal, itemCount;
  if (state) {
    sumTotal = state.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    itemCount = state.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  return (
    <>
      <div className="sticky w-full md:w-20 bottom-0 flex items-center md:items-end left-0 mb-20 ml-0 flex-col md:flex-row md:ml-10 pointer-events-none right-0">
        <div
          onClick={() => setVisible((prev) => !prev)}
          className={`cursor-pointer w-12 h-12 flex-col shadow-3xl p-2 border-2 flex justify-center order-2 md:order-1 items-center mb-6 rounded-full pointer-events-auto ${
            visible
              ? "bg-blue-600 border-white text-white"
              : "bg-white border-blue-700 text-blue-700"
          }`}
        >
          {state && state.length > 0 && (
            <div className="absolute mb-6 bottom-0 text-blue-600 bg-white ml-10 rounded-full border-2 pointer-events-auto border-blue-600 text-center w-5 h-5 text-xs">
              {state.reduce((acc, curr) => acc + curr.quantity, 0)}
            </div>
          )}
          <ShoppingCart32 className="mx-auto my-0" />
        </div>
        <div
          className={`text-center bg-white rounded-lg pt-10 pb-4 px-4 flex flex-col items-center justify-start w-auto shadow-lg pointer-events-auto md:ml-4 mb-2 md:mb-6 bg-opacity-95 border border-blue-400 order-1 md:order-2 ${
            visible ? "visible" : "invisible"
          }`}
        >
          <div
            className="border-b border-gray-500 tracking-wide absolute top-0 pt-2 text-sm"
            style={{ width: "max-content" }}
          >
            Your Shopping Cart
          </div>
          {state && state.length === 0 ? (
            <div className="w-48  text-sm mx-4">
              Your cart is empty. Add an item and check back here later.
            </div>
          ) : (
            state && (
              <div className="flex w-64 justify-end flex-wrap">
                {state.map((myCartItem) => (
                  <div
                    key={myCartItem.id}
                    className="mb-2 w-full flex-wrap flex justify-between items-center rounded-md shadow-md p-2 bg-opacity-100 bg-white"
                    // style={{ background: 'linear-gradient(45deg, white 0%, transparent 100%)'}}
                  >
                    <div
                      className="w-full flex justify-between items-center"
                      // style={{ width: "max-content" }}
                    >
                      <span className="text-left hover:text-blue-900 underline ml-2">
                        <Link
                          as={`/products/${myCartItem.Friendly_SV}`}
                          href="/products/[slug]"
                        >
                          {myCartItem.item}
                        </Link>
                      </span>
                      <span
                        className="cursor-pointer text-gray-700 pr-2 text-xs hover:underline"
                        onClick={() => handleRemoveItem(myCartItem.id)}
                      >
                        <TrashCan16 />
                      </span>
                    </div>
                    <div className="w-full flex  py-1 justify-between">
                      <span className="w-3/4 text-base justify-start flex items-center font-light text-left pl-4">
                        <button
                          onClick={() =>
                            handleAdjustQuantity(myCartItem.id, "DECREASE")
                          }
                          className={`focus:outline-none  ${myCartItem.quantity === 1 && 'text-gray-300'}`}
                          disabled={myCartItem.quantity === 1 ? true : false}
                        >
                          <SubtractAlt16 className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center">

                        {myCartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleAdjustQuantity(myCartItem.id, "INCREASE")
                          }
                          className={`focus:outline-none `}
                        >
                          <AddAlt16 className="w-4 h-4" />
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
                <div className="w-full flex justify-between mt-2 text-sm cursor-pointer text-gray-700">
                  <span onClick={() => handleRemoveAll()}>Clear cart</span>
                  <span className="border-b border-gray-600 border-dashed hover:text-black hover:border-gray-800">
                    <Link href="/checkout">
                    checkout
                    </Link>
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
