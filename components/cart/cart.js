import { ShoppingCart32 } from "@carbon/icons-react";

const Cart = () => {
  const [cartItems, setCartItems] = React.useState({
    product: "Tomb Raider",
    quantity: 1,
  });
  const [showCartItems, setShowCartItems] = React.useState(false);

  return (
    <>
      <div className="sticky w-20 bottom-0 flex flex-col items-center left-0 mb-20 ml-10 right-0">
        <div
          className={`text-center bg-white border-b border-black rounded-md py-8 px-4 ${
            showCartItems ? "visible" : "invisible"
          }`}
        >
          {cartItems.product}
        </div>
        <div
          onClick={() => setShowCartItems((prev) => !prev)}
          className={`cursor-pointer w-12 h-12  shadow-3xl p-2 border-2 flex justify-center items-center mb-20 rounded-full ${
            showCartItems
              ? "bg-gray-700 border-white text-white"
              : "bg-white border-black text-black"
          }`}
        >
          <ShoppingCart32 className="mx-auto my-0" />
        </div>
      </div>
    </>
  );
};

export default Cart;
