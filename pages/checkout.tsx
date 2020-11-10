/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import Undo from '@carbon/icons-react/lib/undo/16'
import AddAlt from '@carbon/icons-react/lib/add--alt/16'
import SubtractAlt from '@carbon/icons-react/lib/subtract--alt/16'
import TrashCan from '@carbon/icons-react/lib/trash-can/16'
import CoverImage from '@/components/cover-image'
import Container from '@/components/container';
import Layout from '@/components/layout';
import { useCart, useDispatchCart, ActionType } from '@/components/cart/cart-context';
import Header from '@/components/header';

export default function Checkout() {
  const { state } = useCart()
  let totalCost: number
  if (state) {
    totalCost = state.reduce(
      (acc: number, curr: { quantity: number; price: number }) => acc + curr.quantity * curr.price,
      0,
    )
  }
  // console.log(state)
  const dispatch: any = useDispatchCart();
  const handleRemoveItem = (id: any) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        id,
      },
    });
  };
  const handleAdjustQuantity = (id: any, action: ActionType['type']) => {
    dispatch({
      type: action,
      payload: {
        id,
      },
    });
  };

  return (
    <>
      <Layout showCartButton="false">
        <Container>
          <Header />
          <div className="mb-20 w-full flex flex-col flex-wrap items-center">
            <Link href="/">
              <div className="cursor-pointer self-start flex w-auto mb-4  text-left">
                <Undo className="w-6 h-6" />
                &nbsp;
                <span className="border-b border-opacity-0 hover:border-opacity-100 border-blue-700 border-dotted ">
                  Continue shopping
                </span>
              </div>
            </Link>
            <div className="bg-white border border-blue-700 w-full py-8 px-4 md:w-1/2 rounded-md">
              <p className="w-full text-center mb-8">
                Please review your order before continuing.
              </p>
              {state.length > 0
                ? (
                  <>
                    {state.map((cartItem) => (
                      <div className="w-full rounded-md p-4 flex hover:shadow-lg shadow-md mb-4 flex-wrap items-center justify-between">
                        <div className="w-1/5 h-auto">
                          <CoverImage
                            productName={cartItem.productName}
                            responsiveImage={cartItem.responsiveImage}
                            shadow={false}
                            slug={cartItem.slug}
                          />
                        </div>
                        <div className="w-4/5 pl-4 flex flex-wrap">

                          <div className="w-3/4">
                            <Link
                              as={`/products/${cartItem.slug}`}
                              href="/products/[slug]"
                            >
                              <a
                                className="border-b border-opacity-0 hover:border-opacity-100 border-blue-700 border-dotted hover:text-blue-800"
                                target="_blank"
                              >
                                {cartItem.item}
                              </a>
                            </Link>
                          </div>
                          <div className="w-1/4 flex items-center text-right text-sm">
                            <button
                              type="button"
                              onClick={() => handleAdjustQuantity(cartItem.id, 'DECREASE')}
                              className={`focus:outline-none  ${
                                cartItem.quantity === 1 && 'text-gray-300'
                              }`}
                              disabled={cartItem.quantity === 1}
                            >
                              <SubtractAlt className="w-4 h-4" />
                            </button>
                            <span className="w-6 mx-1 text-center">{cartItem.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleAdjustQuantity(cartItem.id, 'INCREASE')}
                              className="focus:outline-none "
                            >
                              <AddAlt className="w-4 h-4" />
                            </button>
                            <span
                              className="cursor-pointer text-gray-700 pl-2 text-xs hover:underline"
                              onClick={() => handleRemoveItem(cartItem.id)}
                            >
                              <TrashCan />
                            </span>
                          </div>
                          <div className="w-full flex items-center justify-between">

                            <div className="w-2/3 my-2 text-sm text-gray-700 text-left">
                              Buying
                              {' '}
                              {cartItem.quantity}
                              {' '}
                              items at
                              {' '}
                              {cartItem.price}
                              {' '}
                              :-
                              each
                            </div>
                            <div className="w-1/3  text-right">
                              {cartItem.quantity * cartItem.price}
                              {' '}
                              :-
                            </div>

                          </div>

                        </div>
                      </div>
                    ))}
                    <div className="pr-2 w-full flex justify-end">
                      <p>
                        Total cost:
                        {' '}
                        {totalCost}
                        {' '}
                        :-
                      </p>
                    </div>
                    <div className="w-full flex justify-center">
                      <Link href="/thanks">
                        <button
                          className="bg-blue-600 shadow-xl translate-y-0 hover:-translate-y-px hover:shadow-2xl duration-150 rounded-md px-6 transform transition py-2 text-lg text-white"
                          type="button"
                        >
                          Order
                        </button>
                      </Link>
                    </div>
                  </>
                )
                : (
                  <p className="text-center text-lg">
                    Your shopping cart is empty. Add some items before checking out. Click
                    <Link href="/"><a className="border-b border-blue-600 border-dashed">here</a></Link>
                    {' '}
                    to return to the store.
                  </p>
                )}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}
