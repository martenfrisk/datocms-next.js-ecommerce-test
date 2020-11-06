import { useRef, useEffect } from 'react';
import { useCart } from '@/cart/cart-context'

function useOutsideAlerter(ref) {
  const { showCart } = useCart();
  const [, setVisible] = showCart;
  useEffect(() => {
    /**
         * Alert if clicked on outside of element
         */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(() => false)
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
// eslint-disable-next-line react/prop-types
export default function OutsideCloseCart({ children }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{children}</div>;
}
