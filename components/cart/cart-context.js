import { useReducer, useContext, createContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const CartContext = createContext();
const CartDispatch = createContext();

const isBrowser = typeof window !== 'undefined'

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state && state.some((i) => i.item === action.payload.item)) {
        state.map((item) => {
          if (item.item === action.payload.item) {
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
      return state.filter((i) => i.id !== action.payload.id);
    case "INCREASE":
      return state.map((i) => {
        if (i.id === action.payload.id) {
          return { ...i, quantity: i.quantity + 1 };
        } else {
          return i;
        }
      });
    case "DECREASE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity === 1) {
            return item
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        } else {
          return item;
        }
      });
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const testItem = [
  {
    item: "Tomb Raider",
    id: uuid(),
    quantity: 2,
  },
];
function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}
function getLocalStorage(key, initialValue) {
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
  const [localState, setLocalState] = useState(() => isBrowser && getLocalStorage("cart", initialState));
//   useEffect(() => {
//     setLocalState(getLocalStorage("cart", initialState));
//   }, []);
  const [state, dispatch] = useReducer(reducer, localState);
  useEffect(() => {
    setLocalStorage("cart", state);
  }, [state]);
  return (
    <CartDispatch.Provider value={dispatch}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </CartDispatch.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatch);
