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
          <div className="flex flex-col flex-wrap items-center w-full mb-20">
            <Link href="/">
              <div className="flex self-start w-auto mb-4 text-left cursor-pointer ">
                <Undo className="w-6 h-6" />
                &nbsp;
                <span className="border-b border-blue-700 border-dotted border-opacity-0 hover:border-opacity-100 ">
                  Continue shopping
                </span>
              </div>
            </Link>
            <div className="w-full px-4 py-8 bg-white border border-blue-700 md:w-1/2 rounded-md">
              <p className="w-full mb-8 text-center">
                Please review your order before continuing.
              </p>
              {state.length > 0
                ? (
                  <>
                    {state.map((cartItem) => (
                      <div className="flex flex-wrap items-center justify-between w-full p-4 mb-4 shadow-md rounded-md hover:shadow-lg">
                        <div className="w-1/5 h-auto">
                          <CoverImage
                            productName={cartItem.productName}
                            responsiveImage={cartItem.responsiveImage}
                            shadow={false}
                            slug={cartItem.slug}
                          />
                        </div>
                        <div className="flex flex-wrap w-4/5 pl-4">

                          <div className="w-3/4">
                            <Link
                              as={`/products/${cartItem.slug}`}
                              href="/products/[slug]"
                            >
                              <a
                                className="border-b border-blue-700 border-dotted border-opacity-0 hover:border-opacity-100 hover:text-blue-800"
                                target="_blank"
                              >
                                {cartItem.item}
                              </a>
                            </Link>
                          </div>
                          <div className="flex items-center w-1/4 text-sm text-right">
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
                              className="pl-2 text-xs text-gray-700 cursor-pointer hover:underline"
                              onClick={() => handleRemoveItem(cartItem.id)}
                            >
                              <TrashCan />
                            </span>
                          </div>
                          <div className="flex items-center justify-between w-full">

                            <div className="w-2/3 my-2 text-sm text-left text-gray-700">
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
                            <div className="w-1/3 text-right ">
                              {cartItem.quantity * cartItem.price}
                              {' '}
                              :-
                            </div>

                          </div>

                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end w-full pr-2">
                      <p>
                        Total cost:
                        {' '}
                        {totalCost}
                        {' '}
                        :-
                      </p>
                    </div>
                    <div className="flex justify-center w-full">
                      <Link href="/thanks">
                        <button
                          className="px-6 py-2 text-lg text-white bg-blue-600 shadow-xl translate-y-0 hover:-translate-y-px hover:shadow-2xl duration-150 rounded-md transform transition"
                          type="button"
                        >
                          Order
                        </button>
                      </Link>
                    </div>
                  </>
                )
                : (
                  <p className="text-lg text-center">
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
