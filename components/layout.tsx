/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from './meta'
import Cart from './cart/cart'
import { useCart } from './cart/cart-context'

export default function Layout({ children, showCartButton = 'true' }: { children: object, showCartButton: string }) {
  const router = useRouter()
  // @ts-ignore
  const { showCart } = useCart()
  const [, setVisible] = showCart

  useEffect(() => {
    setVisible(false)
  }, [router.asPath])

  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
        {showCartButton === 'true' && <Cart />}
      </div>
    </>
  )
}
