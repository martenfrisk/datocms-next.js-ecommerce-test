import '../styles/index.css'
import { CartProvider } from '../components/cart/cart-context'

function MyApp({ Component, pageProps }) {
  return (
  <CartProvider>
    <Component {...pageProps} />
  </CartProvider>
  )
}

export default MyApp
