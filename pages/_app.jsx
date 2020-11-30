/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import '../styles/index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { usePreview } from 'react-dnd-preview'
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import { CartProvider } from '../components/cart/cart-context'

const MyPreview = () => {
  const {
    display, item, style, ref,
  } = usePreview()
  if (!display) {
    return null
  }
  return <img src={item.cover.src} style={style} className="z-20 w-1/2 h-auto opacity-25 sm:hidden" ref={ref} alt="" />
}
function MyApp({ Component, pageProps }) {
  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
      },
      {
        backend: TouchBackend,
        preview: true,
        transition: TouchTransition,
      },
    ],
  }
  return (
    <CartProvider>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Component {...pageProps} />
        <MyPreview />
      </DndProvider>
    </CartProvider>
  )
}

export default MyApp
