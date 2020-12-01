import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Meta from './meta'
import { useCart } from './cart/cart-context'

const Cart = dynamic(import('./cart/cart'))

export default function Layout({ children, showCartButton = 'true' }: { children: object, showCartButton: string }) {
  const router = useRouter()
  const { showCart } = useCart()
  const [, setVisible] = showCart

  useEffect(() => {
    setVisible(false)
  }, [router.asPath])

  return (
    <>
      <Meta />
      <div className="min-h-screen bg-white text-blueish-800">
        <main>{children}</main>
        {showCartButton === 'true' && <Cart />}
      </div>
    </>
  )
}
