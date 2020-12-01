/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Undo from '@carbon/icons-react/lib/undo/16'
import AddAlt from '@carbon/icons-react/lib/add--alt/16'
import SubtractAlt from '@carbon/icons-react/lib/subtract--alt/16'
import TrashCan from '@carbon/icons-react/lib/trash-can/16'
import CoverImage from '@/components/cover-image'
import Layout from '@/components/layout';
import { useCart, useDispatchCart, ActionType } from '@/components/cart/cart-context';
import Header from '@/components/header';

export default function Checkout() {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
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
  const handleRemoveItem = (slug: any) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        slug,
      },
    });
  };
  const handleAdjustQuantity = (slug: any, action: ActionType['type']) => {
    dispatch({
      type: action,
      payload: {
        slug,
      },
    });
  };

  useEffect(() => {
    const getUser = window.localStorage.getItem('username')
    setUser(getUser)
  }, [])

  async function insertIntoDb() {
    const requestBody = {
      user,
      order: state,
      time: new Date().toISOString(),
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(requestBody),
    };
    setLoading(true)
    await fetch('https://testbutik-783b.restdb.io/rest/orders?apikey=5fabefbd8639597288385276', requestOptions)
      .then((result) => console.log(result))
      .then(() => {
        window.localStorage.setItem('username', user)
        router.push('/thanks')
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <Layout showCartButton="false">
        <Header />
        <div className="flex flex-col flex-wrap items-center w-full pb-20 text-blueish-800">
          <Link href="/">
            <div className="flex self-start w-auto pl-4 mb-4 text-left cursor-pointer ">
              <span className="border-b border-blue-200 border-opacity-0 border-dotted hover:border-opacity-100 ">
                Continue shopping
              </span>
              &nbsp;
              <Undo className="w-6 h-6" />
            </div>
          </Link>
          <div className="w-full py-8 bg-white rounded-md md:w-1/2">
            <p className="w-full mb-8 text-center">
              Please review your order before continuing.
            </p>
            {state.length > 0
              ? (
                <>
                  {state.map((cartItem) => (
                    <div className="flex flex-wrap items-center justify-between w-full px-2 py-2 mb-4 rounded-md shadow-md hover:shadow-lg">
                      <div className="w-1/5 h-auto">
                        <CoverImage
                          productName={cartItem.productName}
                          responsiveImage={cartItem.responsiveImage}
                          shadow={false}
                          slug={cartItem.slug}
                        />
                      </div>
                      <div className="flex flex-wrap w-4/5 px-2">

                        <div className="w-3/4">
                          <Link
                            as={`/products/${cartItem.slug}`}
                            href="/products/[slug]"
                          >
                            <a
                              className="border-b border-blue-700 border-opacity-0 border-dotted hover:border-opacity-100 hover:text-blue-800"
                              target="_blank"
                            >
                              {cartItem.item}
                            </a>
                          </Link>
                        </div>
                        <div className="flex items-center justify-end w-1/4 text-sm">
                          <button
                            type="button"
                            onClick={() => handleAdjustQuantity(cartItem.slug, 'DECREASE')}
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
                            onClick={() => handleAdjustQuantity(cartItem.slug, 'INCREASE')}
                            className="focus:outline-none "
                          >
                            <AddAlt className="w-4 h-4" />
                          </button>
                          <span
                            className="pl-2 text-xs text-gray-700 cursor-pointer hover:underline"
                            onClick={() => handleRemoveItem(cartItem.slug)}
                          >
                            <TrashCan />
                          </span>
                        </div>
                        <div className="flex items-center justify-between w-full">

                          <div className="w-2/3 my-2 text-sm italic text-left text-gray-700">
                            {cartItem.quantity}
                            {' '}
                            x
                            {' '}
                            {cartItem.price}
                            :-
                          </div>
                          <div className="w-1/3 text-right ">
                            {cartItem.quantity * cartItem.price}
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
                      :-
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full mt-4">
                    <p>Enter your name and press order.</p>
                    <input
                      type="text"
                      name="user"
                      placeholder="Your name here"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      className="py-2 my-2 text-center bg-blue-100 rounded-md"
                    />
                    {user !== '' && (
                    <button
                      className="flex items-center px-6 py-2 text-lg text-white transition duration-150 transform translate-y-0 bg-blue-600 rounded-md shadow-xl hover:-translate-y-px hover:shadow-2xl"
                      type="button"
                      onClick={() => insertIntoDb()}
                    >
                      <svg className={`w-5 h-5 mr-2 -ml-2 animate-spin text-white ${loading ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Order
                      <span className="w-5">
                        {' '}
                      </span>
                    </button>
                    )}
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
      </Layout>
    </>
  );
}
