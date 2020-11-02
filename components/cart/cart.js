import { ShoppingCart32 } from "@carbon/icons-react";

import { useCart, useDispatchCart } from "./cart-context";

const Cart = () => {
  const [showCartItems, setShowCartItems] = React.useState(false);
  const state = useCart();
  const dispatch = useDispatchCart();
  console.log(state);
  const handleRemoveItem = (id) => {
    dispatch({
      type: "REMOVE",
      payload: {
        id,
      },
    });
    console.log(state);
  };

  return (
    <>
      <div className="sticky w-20 bottom-0 flex items-end left-0 mb-20 ml-10  right-0">
        <div
          onClick={() => setShowCartItems((prev) => !prev)}
          className={`cursor-pointer w-12 h-12  shadow-3xl p-2 border-2 flex justify-center items-center mb-6 rounded-full ${
            showCartItems
              ? "bg-gray-700 border-white text-white"
              : "bg-white border-black text-black"
          }`}
        >
          <ShoppingCart32 className="mx-auto my-0" />
        </div>
        <div
          className={`text-center bg-white rounded-md py-8 px-4 flex flex-col items-center justify-start w-auto ml-4 mb-6 bg-opacity-75 ${
            showCartItems ? "visible" : "invisible"
          }`}
        >
          <div className="border-b border-gray-500 tracking-wide absolute top-0 py-px text-sm" style={{ width: 'max-content'}}>Your Shopping Cart</div>
          {state.length === 0
            ? <div className="w-48">Your cart is empty. Add an item and check back here later.</div>
            : state.map((myCartItem) => (
                <div key={myCartItem.id} className="w-48 flex justify-between">
                  {myCartItem.item} ({myCartItem.quantity}){" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => handleRemoveItem(myCartItem.id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
