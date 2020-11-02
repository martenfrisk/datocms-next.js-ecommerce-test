import { useReducer, useContext, createContext } from "react";
import { v4 as uuid } from "uuid";

const CartContext = createContext();
const CartDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
        if(state.some(i => i.item === action.payload.item)) {
            state.map(item => {
                if (item.item === action.payload.item) {
                    return {...item, quantity: item.quantity++}
                } else {
                    return item
                }
            })
        } else {
            return state.concat({
                item: action.payload.item,
                id: uuid(),
                quantity: action.payload.quantity,
            });
        }    
    case "REMOVE":
      return state.filter((i) => i.id !== action.payload.id);
    case "INCREASE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: quantity++ };
        } else {
          return item;
        }
      });
    case "DECREASE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: quantity-- };
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
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error(e)
    }
}
function getLocalStorage(key, initialValue) {
    try {
        const value = window.localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
    } catch (e) {
        console.error(e)
        return initialValue
    }
}
// const localState = JSON.parse(localStorage.getItem("cart"))
const initialState = []

export const CartProvider = ({ children }) => {
    const [localState, setLocalState] = React.useState()
    React.useEffect(() => {
        setLocalState(getLocalStorage("cart", initialState))
    }, [])
  const [state, dispatch] = useReducer(reducer, localState || initialState);
  React.useEffect(() => {
      setLocalStorage("cart", state)
  }, [state])
  return (
    <CartDispatch.Provider value={dispatch}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </CartDispatch.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatch)