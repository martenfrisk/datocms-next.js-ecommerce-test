import { useDrop } from "react-dnd";
import { useState } from 'react'
import Cart from "./cart";
import update from "immutability-helper";

const CartWrapper = () => {
  const [carts, setCarts] = useState({
    bottom: 20,
    left: 80,
  });
  const [, drop] = useDrop({
    accept: "cart",
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const bottom = Math.round(item.bottom + delta.y);
      moveCart(left, bottom);
      return undefined;
    },
  });
  const moveCart = (left, bottom) => {
    setCarts(
        update(carts, {
            $merge: { left, bottom },
        })
    );
  };
  return (
    <div ref={drop}>
          <Cart
            left={carts.left}
            bottom={carts.bottom}
          />
    </div>
  );
};

export default CartWrapper
