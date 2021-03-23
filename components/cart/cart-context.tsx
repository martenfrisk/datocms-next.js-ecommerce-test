/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { updateCart } from '@/lib/airapi';
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

const cartUpdate = async (product: string, quantity: number) => {
	const user = window.localStorage.getItem('user_data')
	if (user) {
		const res = await updateCart(JSON.parse(user), product, quantity.toString())
		console.log({ res })
	}
}
// function moveToFirst(fromIndex: number, array: any[]) {
// 	const arr = [...array]
// 	arr.splice(0, 0, ...arr.splice(fromIndex, 1));
// 	return arr
// }

const reducer = (state: any, action: ActionType) => {
	console.log(action)
	console.log(state)
	switch (action.type) {
	case 'ADD_ITEM':
		if (state.some((i: ActionType['payload']) => i.responsiveImage === action.payload.responsiveImage)) {
			let prevQuantity: number
			state.map((item: ActionType['payload']) => {
				if (item.slug === action.payload.slug) {
					prevQuantity = item.quantity
					// eslint-disable-next-line no-plusplus
					return { ...item, quantity: item.quantity++ };
				}
				return item;
			})
			cartUpdate(action.payload.responsiveImage, prevQuantity++)
			// const elPos = state.findIndex((x: ActionType['payload']) => x.slug === action.payload.slug)
			// state = moveToFirst(elPos, state)
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
			cartUpdate(action.payload.responsiveImage, 1)
			return newObj.concat(state);
		}
		// eslint-disable-next-line no-fallthrough
	case 'REMOVE':
		cartUpdate(action.payload.responsiveImage, 0)
		return state.filter((i: ActionType['payload']) => i.id !== action.payload.id);
	case 'INCREASE':
		return state.map((i: ActionType['payload']) => {
			if (i.id === action.payload.id) {
				cartUpdate(action.payload.responsiveImage, i.quantity + 1)
				return { ...i, quantity: i.quantity + 1 };
			}
			return i;
		});
	case 'DECREASE':
		return state.map((item: ActionType['payload']) => {
			if (item.id === action.payload.id) {
				cartUpdate(action.payload.responsiveImage, item.quantity - 1)
				if (item.quantity === 1) {
					return item;
				}
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
	case 'CLEAR':
		console.log('Clearing cart...')
		state.forEach((item: ActionType['payload']) => {
			cartUpdate(item.responsiveImage, 0)
		})
		// eslint-disable-next-line no-return-assign
		return (state = initialState);
	default:
		throw new Error(`Unknown action: ${action.type}`);
	}
};

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

export const useCart = () => useContext<ICartContext>(CartContext)
export const useDispatchCart = () => useContext(CartDispatch);
