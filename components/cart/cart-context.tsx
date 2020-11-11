/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import { v4 as uuid } from 'uuid';

interface ICartContext {
  state: any,
  showCart: any,
  dragging: any
}

const CartContext = createContext<ICartContext>(null);
// @ts-ignore
const CartDispatch = createContext();

const isBrowser = typeof window !== 'undefined';

export type ActionType = {
  type: 'ADD_ITEM' | 'REMOVE' | 'INCREASE' | 'DECREASE' | 'CLEAR',
  payload: {
    slug: string,
    item: string,
    quantity: number,
    price: number,
    id: string,
    responsiveImage: any
  }
}

const initialState = [];

function moveToFirst(fromIndex: number, array: any[]) {
  const arr = [...array]
  arr.splice(0, 0, ...arr.splice(fromIndex, 1));
  return arr
}

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.some((i: ActionType['payload']) => i.slug === action.payload.slug)) {
        state.map((item: ActionType['payload']) => {
          if (item.slug === action.payload.slug) {
            // eslint-disable-next-line no-plusplus
            return { ...item, quantity: item.quantity++ };
          }
          return item;
        })
        const elPos = state.findIndex((x: ActionType['payload']) => x.slug === action.payload.slug)
        state = moveToFirst(elPos, state)
        // const el = state.filter((x: ActionType['payload']) => x.slug === action.payload.slug)
        // state.splice(elPos, 1)
        // state.unshift(el)
      } else {
        const newObj = [{
          item: action.payload.item,
          id: uuid(),
          quantity: action.payload.quantity,
          price: action.payload.price,
          slug: action.payload.slug,
          responsiveImage: action.payload.responsiveImage,
        }]
        return newObj.concat(state);
      }
    // eslint-disable-next-line no-fallthrough
    case 'REMOVE':
      return state.filter((i: ActionType['payload']) => i.id !== action.payload.id);
    case 'INCREASE':
      return state.map((i: ActionType['payload']) => {
        if (i.id === action.payload.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
    case 'DECREASE':
      return state.map((item: ActionType['payload']) => {
        if (item.id === action.payload.id) {
          if (item.quantity === 1) {
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    case 'CLEAR':
      console.log('Clearing cart...')
      // eslint-disable-next-line no-return-assign
      return (state = initialState);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// const testItem = [
//   {
//     item: "Tomb Raider",
//     id: uuid(),
//     quantity: 2,
//   },
// ];
function setLocalStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}
function getLocalStorage(key: string, initialValue: any[]) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    console.error(e);
    return null
  }
}

export const CartProvider = ({ children }: { children: any }) => {
  // eslint-disable-next-line no-unused-vars
  const [localState, setLocalState] = useState(
    () => isBrowser && getLocalStorage('cart', initialState),
  );

  const [visible, setVisible] = useState(false)
  const [currentlyDragging, setCurrentlyDragging] = useState(false)
  //   useEffect(() => {
  //     setLocalState(getLocalStorage("cart", initialState));
  //   }, []);

  const [state, dispatch] = useReducer(reducer, localState);

  useEffect(() => {
    setLocalStorage('cart', state);
  }, [state]);

  return (
    <CartDispatch.Provider value={dispatch}>
      <CartContext.Provider
        value={{
          state,
          showCart: [visible, setVisible],
          dragging: [currentlyDragging, setCurrentlyDragging],
        }}
      >
        {children}
      </CartContext.Provider>
    </CartDispatch.Provider>
  );
};

// interface useCartContext {
//   state: any,
//   dispatch: any
// }

export const useCart = () => useContext<ICartContext>(CartContext)
export const useDispatchCart = () => useContext(CartDispatch);
