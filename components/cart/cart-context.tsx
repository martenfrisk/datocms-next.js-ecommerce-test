import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { v4 as uuid } from "uuid";

// @ts-ignore
const CartContext = createContext();
// @ts-ignore
const CartDispatch = createContext();

const isBrowser = typeof window !== "undefined";

export type ActionType = {
  type: 'ADD_ITEM' | 'REMOVE' | 'INCREASE' | 'DECREASE' | 'CLEAR',
  payload: {
    slug: string,
    item: string,
    quantity: number,
    price: number,
    id: string
  }
}

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.some((i: ActionType["payload"]) => i.slug === action.payload.slug)) {
        state.map((item: ActionType["payload"]) => {
          if (item.slug === action.payload.slug) {
            return { ...item, quantity: item.quantity++ };
          } else {
            return item;
          }
        });
      } else {
        return state.concat({
          item: action.payload.item,
          id: uuid(),
          quantity: action.payload.quantity,
          price: action.payload.price,
          slug: action.payload.slug,
        });
      }
    case "REMOVE":
      return state.filter((i: ActionType["payload"]) => i.id !== action.payload.id);
    case "INCREASE":
      return state.map((i: ActionType["payload"]) => {
        if (i.id === action.payload.id) {
          return { ...i, quantity: i.quantity + 1 };
        } else {
          return i;
        }
      });
    case "DECREASE":
      return state.map((item: ActionType["payload"]) => {
        if (item.id === action.payload.id) {
          if (item.quantity === 1) {
            return item;
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        } else {
          return item;
        }
      });
    case "CLEAR":
      console.log('Clearing cart...')
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
    // return initialValue
  }
}
// const localState = JSON.parse(localStorage.getItem("cart"))
// const initialState = [{
//     item: '',
//     id: '',
//     quantity: 0
// }];
const initialState = [];

export const CartProvider = ({ children }) => {
  const [localState, setLocalState] = useState(
    () => isBrowser && getLocalStorage("cart", initialState)
  );

  const [visible, setVisible] = useState(false)

  //   useEffect(() => {
  //     setLocalState(getLocalStorage("cart", initialState));
  //   }, []);

  const [state, dispatch] = useReducer(reducer, localState);

  useEffect(() => {
    setLocalStorage("cart", state);
  }, [state]);

  return (
    <CartDispatch.Provider value={dispatch}>
      <CartContext.Provider value={{ state, showCart: [visible, setVisible] }}>{children}</CartContext.Provider>
    </CartDispatch.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatch);
