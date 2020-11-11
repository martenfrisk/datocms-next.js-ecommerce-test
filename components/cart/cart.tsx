/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import Link from 'next/link';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '@/lib/types'
import OutsideCloseCart from '@/lib/click-outside';
import ShoppingCart from '@carbon/icons-react/lib/shopping--cart/32'
import AddAlt from '@carbon/icons-react/lib/add--alt/16'
import SubtractAlt from '@carbon/icons-react/lib/subtract--alt/16'
import TrashCan from '@carbon/icons-react/lib/trash-can/16'

import { useCart, useDispatchCart, ActionType } from './cart-context';

const Cart = () => {
  const { state, showCart, dragging } = useCart();
  const [visible, setVisible] = showCart;
  const [currentlyDragging] = dragging
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.PRODUCT,
    drop: () => ({ name: 'Cart' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  useEffect(() => {
    if (isActive) {
      setVisible(true)
    }
  }, [isActive])
  const dispatch: any = useDispatchCart();
  const handleRemoveItem = (id: string) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        id,
      },
    });
  };

  const handleAdjustQuantity = (id: string, action: ActionType['type']) => {
    dispatch({
      type: action,
      payload: {
        id,
      },
    });
  };
  const handleRemoveAll = () => {
    dispatch({
      type: 'CLEAR',
    });
  };
  let sumTotal: number; let
    itemCount: number;
  if (state) {
    sumTotal = state.reduce(
      (acc: number, curr: { quantity: number; price: number }) => acc + curr.quantity * curr.price,
      0,
    );
    itemCount = state.reduce(
      (acc: number, curr: { quantity: number; price: number }) => acc + curr.quantity,
      0,
    );
  }

  return (
    <>
      <div
        className={`sticky w-full md:w-20 bottom-0 flex items-center md:items-end left-0 mb-20  flex-col md:flex-row md:ml-10 transition-all duration-100 pointer-events-none right-0 max-h-screen transform ${isActive && 'scale-y-105'}`}
        ref={drop}
      >
        {!visible && (
          <div
            onClick={() => setVisible(true)}
            className="cursor-pointer w-12 h-12 flex-col shadow-3xl p-2 border-2 flex justify-center order-last md:order-first items-center mb-6 rounded-full pointer-events-auto bg-blue-600 border-white text-white"
          >
            {state && state.length > 0 && (
              <div className="absolute mb-6 bottom-0 text-blue-600 bg-white ml-10 rounded-full border-2 pointer-events-auto border-blue-600 text-center w-5 h-5 text-xs">
                {state.reduce(
                  (acc: number, curr: { quantity: number }) => acc + curr.quantity,
                  0,
                )}
              </div>
            )}
            <ShoppingCart className="mx-auto my-0" />
          </div>
        )}

        <OutsideCloseCart>
          <div
            className={`text-center bg-white rounded-lg pt-8 flex flex-col items-center justify-start w-auto shadow-lg pointer-events-auto mb-2 overflow-y-scroll  md:mb-6 bg-opacity-95 border border-blue-400 order-1 md:order-2 ${
              visible ? 'visible' : 'invisible'
            }`}
            style={{ maxHeight: '50vh' }}
          >
            {currentlyDragging && (
              <div
                className="w-84 rounded-md pb-2 md:pb-6 h-full absolute z-30 top-0 bg-gray-700 bg-opacity-50 text-white flex justify-center items-center text-xl"
                style={{ maxHeight: '50vh' }}
              >
                <p>Drop item here to add to cart.</p>
              </div>
            )}
            <div
              className="px-4 w-auto tracking-wide absolute top-0 pt-2 text-sm select-none"
              style={{ width: 'max-content' }}
            >
              Your Shopping Cart
            </div>
            <div className="overflow-y-scroll max-h-screen">
              {state && state.length === 0 ? (
                <div className="w-48 select-none text-sm mx-4">
                  Your cart is empty. Add an item and check back here later.
                </div>
              ) : (
                state && (
                <div className="flex w-84 max-w-screen-sm justify-end flex-wrap">
                  <div className="h-1/2 w-full">
                    {state.map((myCartItem: ActionType['payload']) => (
                      <div
                        key={myCartItem.id}
                        className="pb-2 border-b border-blue-400 border-opacity-50 w-full flex-wrap flex justify-between items-center px-2 py-1 md:p-2 bg-opacity-100 bg-white"
                      >
                        <div
                          className="w-full flex justify-between items-start"
                        >
                          <span className="text-left hover:text-blue-900 ">
                            <Link
                              as={`/products/${myCartItem.slug}`}
                              href="/products/[slug]"
                            >
                              {myCartItem.item}
                            </Link>
                          </span>
                          <span className="w-1/4 text-right">
                            {myCartItem.price}
                            {' '}
                            :-
                          </span>
                        </div>

                        <div className="w-full flex  items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleAdjustQuantity(myCartItem.id, 'DECREASE')}
                            className={`focus:outline-none  ${
                              myCartItem.quantity === 1 && 'text-gray-300'
                            }`}
                            disabled={myCartItem.quantity === 1}
                          >
                            <SubtractAlt className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center">
                            {myCartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdjustQuantity(myCartItem.id, 'INCREASE')}
                            className="focus:outline-none "
                          >
                            <AddAlt className="w-4 h-4" />
                          </button>
                          <span
                            className="cursor-pointer text-gray-700 pl-4 text-xs hover:underline"
                            onClick={() => handleRemoveItem(myCartItem.id)}
                          >
                            <TrashCan />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sticky  px-4 w-full h-20 bg-white left-auto bottom-0">
                    <div className="mt-4 flex justify-between w-full items-center">
                      <span className="w-2/3 text-sm text-left">
                        Total
                        {' '}
                        {itemCount > 0 && itemCount}
                        {' '}
                        items
                      </span>
                      <span className="w-1/3 text-right">
                        {sumTotal > 0 && sumTotal}
                        {' '}
                        :-
                      </span>
                    </div>
                    <div className="w-full flex justify-between mt-2 text-sm cursor-pointer text-gray-700">
                      <span onClick={() => {
                        handleRemoveAll()
                        if (!visible) {
                          setVisible(() => true)
                        }
                      }}
                      >
                        Clear cart
                      </span>
                      <span className="border-b border-gray-600 border-dashed hover:text-black hover:border-gray-800">
                        <Link href="/checkout">checkout</Link>
                      </span>
                    </div>
                  </div>
                </div>
                )
              )}
            </div>
          </div>
        </OutsideCloseCart>
      </div>
    </>
  );
};

export default Cart;
