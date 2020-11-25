/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Container from '@/components/container';
import Layout from '@/components/layout';
import { useCart, useDispatchCart } from '@/components/cart/cart-context';
import Header from '@/components/header';

export default function Thanks() {
  const { state } = useCart()
  const [finalOrder] = useState(state)
  const dispatch: any = useDispatchCart()
  useEffect(() => {
    dispatch({
      type: 'CLEAR',
    })
  }, [])
  return (
    <>
      <Layout showCartButton="false">
        <Container>
          <Header />
          <div className="flex flex-col flex-wrap items-center w-full px-4 pt-8 text-navy-600">
            <div className="flex flex-col items-center w-full md:w-1/2">
              <p className="mb-4">
                Thank you purchasing
                {' '}
                <span className="italic">{finalOrder.length > 0 && finalOrder.map((i) => i.item).join(', ')}</span>
                . A list of your items has been sent to Santa Claus and your items will
                arrive in late December*.
              </p>
              <p>
                Return to the
                {' '}
                <Link href="/">
                  <button type="button" className="border-b border-blue-700 border-dashed">home screen</button>
                </Link>
                {' '}
                to do some more shopping!
              </p>
              <p>
                <Link href="/user/profile">
                  <button
                    type="button"
                    className="px-6 py-2 mt-6 text-white transform bg-blue-700 rounded-md shadow-lg hover:translate-y-px"
                  >
                    Your orders
                  </button>
                </Link>
              </p>
              <p className="mt-10 text-xs">
                * Average delivery time is 2-4 months. If you have not received
                your items before the year 2031, please contact us and we might
                issue a refund.
              </p>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}
