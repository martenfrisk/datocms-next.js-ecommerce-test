import Meta from '../components/meta'
import Cart from './cart/cart'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
          <Cart />
      </div>
    </>
  )
}
