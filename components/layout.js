import Meta from '../components/meta'
import Cart from './cart/cart'
import { useCart } from '../components/cart/cart-context'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
export default function Layout({ children, showCartButton = 'true'}) {
  const router = useRouter()
  const { showCart } = useCart()
  const [ visible, setVisible ] = showCart

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
