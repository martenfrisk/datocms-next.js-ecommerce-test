/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import '../styles/index.css'
import { Provider } from 'next-auth/client'
import { CartProvider } from '../components/cart/cart-context'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Provider>
  )
}

export default MyApp
