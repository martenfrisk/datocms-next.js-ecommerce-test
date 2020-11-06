/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import OutsideCloseCart from '@/lib/click-outside';
import {
  ShoppingCart32,
  AddAlt16,
  SubtractAlt16,
  TrashCan16,
} from '@carbon/icons-react';

import { useCart, useDispatchCart, ActionType } from './cart-context';

const Cart = () => {
  const { state, showCart } = useCart();
  const [visible, setVisible] = showCart;

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
      <div className="sticky w-full md:w-20 bottom-0 flex items-center md:items-end left-0 mb-20 ml-0 flex-col md:flex-row md:ml-10 pointer-events-none right-0">
        <div
          onClick={() => setVisible((prev: boolean) => !prev)}
          className={`cursor-pointer w-12 h-12 flex-col shadow-3xl p-2 border-2 flex justify-center order-last md:order-first items-center mb-6 rounded-full pointer-events-auto ${
            visible
              ? 'bg-blue-600 border-white text-white'
              : 'bg-white border-blue-700 text-blue-700'
          }`}
        >
          {state && state.length > 0 && (
            <div className="absolute mb-6 bottom-0 text-blue-600 bg-white ml-10 rounded-full border-2 pointer-events-auto border-blue-600 text-center w-5 h-5 text-xs">
              {state.reduce(
                (acc: number, curr: { quantity: number }) => acc + curr.quantity,
                0,
              )}
            </div>
          )}
          <ShoppingCart32 className="mx-auto my-0" />
        </div>

        <OutsideCloseCart>
          <div
            className={`text-center bg-white rounded-lg pt-10 pb-4 px-4 flex flex-col items-center justify-start w-auto shadow-lg pointer-events-auto md:ml-4 mb-2 md:mb-6 bg-opacity-95 border border-blue-400 order-1 md:order-2 ${
              visible ? 'visible' : 'invisible'
            }`}
          >
            <div
              className="border-b border-gray-500 tracking-wide absolute top-0 pt-2 text-sm select-none"
              style={{ width: 'max-content' }}
            >
              Your Shopping Cart
            </div>
            {state && state.length === 0 ? (
              <div className="w-48 select-none text-sm mx-4">
                Your cart is empty. Add an item and check back here later.
              </div>
            ) : (
              state && (
                <div className="flex w-64 justify-end flex-wrap">
                  {state.map((myCartItem: ActionType['payload']) => (
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
                            as={`/products/${myCartItem.slug}`}
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
                            type="button"
                            onClick={() => handleAdjustQuantity(myCartItem.id, 'DECREASE')}
                            className={`focus:outline-none  ${
                              myCartItem.quantity === 1 && 'text-gray-300'
                            }`}
                            disabled={myCartItem.quantity === 1}
                          >
                            <SubtractAlt16 className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center">
                            {myCartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdjustQuantity(myCartItem.id, 'INCREASE')}
                            className="focus:outline-none "
                          >
                            <AddAlt16 className="w-4 h-4" />
                          </button>
                        </span>
                        <span className="w-1/4 text-right">
                          {myCartItem.price}
                          {' '}
                          :-
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex justify-between w-full items-end">
                    <span className="w-2/3 text-sm">
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
              )
            )}
          </div>
        </OutsideCloseCart>
      </div>
    </>
  );
};

export default Cart;
