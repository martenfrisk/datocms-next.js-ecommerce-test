/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import Link from 'next/link'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '@/lib/types'
import OutsideCloseCart from '@/lib/click-outside'
import {
	CarbonShoppingCart,
	CarbonAddAlt,
	CarbonSubtractAlt,
	CarbonTrashCan,
	CarbonSend,
} from '@/components/icons'

import { useCart, useDispatchCart, ActionType } from './cart-context'

const Cart = () => {
	const { state, showCart, dragging } = useCart()
	const [visible, setVisible] = showCart
	const [currentlyDragging] = dragging
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.PRODUCT,
		drop: () => ({ name: 'Cart' }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})
	const isActive = canDrop && isOver
	useEffect(() => {
		if (isActive) {
			setVisible(true)
		}
	}, [isActive])
	const dispatch: any = useDispatchCart()
	const handleRemoveItem = (responsiveImage: string, id: string) => {
		dispatch({
			type: 'REMOVE',
			payload: {
				responsiveImage,
				id,
			},
		})
	}

	const handleAdjustQuantity = (
		responsiveImage: string,
		id: string,
		action: ActionType['type'],
	) => {
		dispatch({
			type: action,
			payload: {
				responsiveImage,
				id,
			},
		})
	}
	const handleRemoveAll = () => {
		dispatch({
			type: 'CLEAR',
		})
	}
	let sumTotal: number
	let itemCount: number
	if (state) {
		sumTotal = state.reduce(
			(acc: number, curr: { quantity: number; price: number }) => acc + curr.quantity * curr.price,
			0,
		)
		itemCount = state.reduce(
			(acc: number, curr: { quantity: number; price: number }) => acc + curr.quantity,
			0,
		)
	}

	return (
		<>
			<div
				className={`sticky w-full md:w-20 bottom-0 flex items-center md:items-end left-0 flex-col md:flex-row md:ml-10 text-blueish-800 transition-all duration-100 pointer-events-none z-20 right-0 max-h-screen transform ${
					isActive && 'scale-y-105'
				}`}
				ref={drop}
			>
				{!visible && (
					<div
						onClick={() => setVisible(true)}
						className="flex flex-col items-center justify-center order-last w-12 h-12 p-2 mb-4 text-white bg-blue-600 border-2 border-white rounded-full cursor-pointer pointer-events-auto sm:mb-20 shadow-3xl md:order-first"
					>
						{/* {state && state.length > 0 && ( */}
						<div className="absolute w-5 h-5 mb-4 ml-10 text-xs text-center text-blue-600 bg-white border-2 border-blue-600 rounded-full pointer-events-auto ">
							{itemCount || '0'}
						</div>
						{/* )} */}
						<div className="absolute w-6 h-6 mx-auto my-0">
							<CarbonShoppingCart />
						</div>
					</div>
				)}

				<OutsideCloseCart>
					<div
						className={`text-center bg-white rounded-lg pt-8 flex flex-col items-center justify-start w-auto shadow-lg pointer-events-auto mb-2 overflow-y-scroll px-0 md:mb-6 border border-blue-400  ${
							visible ? 'block' : 'hidden'
						}`}
						style={{ maxHeight: '50vh' }}
					>
						{currentlyDragging && (
							<div
								className="absolute top-0 z-30 flex flex-col items-center justify-start h-full pb-2 mt-px mb-20 space-y-2 text-lg rounded-lg bg-gradient-to-b from-white to-transparent w-72 md:pb-6"
								style={{ maxHeight: 'inherit' }}
							>
								<p className="w-full pt-4 text-gray-800 bg-white rounded-lg ">
									Drop item here to add to cart.
								</p>
							</div>
						)}
						<div className="absolute top-0 px-4 pt-2 text-sm tracking-wide select-none w-72">
							Your Shopping Cart
						</div>
						<div className="max-h-screen p-0 mx-auto w-72">
							{state && state.length === 0 ? (
								<div className="px-4 py-4 text-sm select-none">
									Your cart is empty.
								</div>
							) : (
								state && (
									<div className="flex flex-wrap justify-end max-w-screen-sm">
										<div className="w-full h-1/2">
											{state.map((myCartItem: ActionType['payload']) => (
												<div
													key={myCartItem.id}
													className="flex flex-wrap items-center justify-between w-full px-4 py-1 pb-2 bg-white border-b border-blue-400 border-opacity-50 md:p-2"
												>
													<div className="flex items-start justify-between w-full">
														<span className="text-left hover:text-blue-900 ">
															<Link
																as={`/products/${myCartItem.slug}`}
																href="/products/[slug]"
															>
																{myCartItem.item}
															</Link>
														</span>
														<span className="w-1/4 text-right">
															{myCartItem.price}
															{' '}
															:-
														</span>
													</div>

													<div className="flex items-center justify-end w-full">
														<button
															type="button"
															onClick={() => handleAdjustQuantity(
																myCartItem.responsiveImage,
																myCartItem.id,
																'DECREASE',
															)}
															className={`focus:outline-none  ${
																myCartItem.quantity === 1 && 'text-gray-300'
															}`}
															disabled={myCartItem.quantity === 1}
														>
															<div className="w-4 h-4">
																<CarbonSubtractAlt />
															</div>
														</button>
														<span className="w-6 text-center">
															{myCartItem.quantity}
														</span>
														<button
															type="button"
															onClick={() => handleAdjustQuantity(
																myCartItem.responsiveImage,
																myCartItem.id,
																'INCREASE',
															)}
															className="focus:outline-none "
														>
															<div className="w-4 h-4">
																<CarbonAddAlt />
															</div>
														</button>
														<span
															className="w-4 h-4 ml-2 text-xs text-gray-700 cursor-pointer hover:underline"
															onClick={() => handleRemoveItem(
																myCartItem.responsiveImage,
																myCartItem.id,
															)}
														>
															<CarbonTrashCan />
														</span>
													</div>
												</div>
											))}
										</div>
										<div className="sticky bottom-0 left-auto w-full h-20 px-4 bg-white">
											<div className="flex items-center justify-between w-full mt-4">
												<span className="w-2/3 text-sm text-left">
													Total
													{' '}
													{itemCount > 0 && itemCount}
													{' '}
													items
												</span>
												<span className="w-1/3 text-right">
													{sumTotal > 0 && sumTotal}
													{' '}
													:-
												</span>
											</div>
											<div className="flex justify-between w-full mt-2 text-sm text-gray-700 cursor-pointer">
												<span
													onClick={() => {
														handleRemoveAll()
														if (!visible) {
															setVisible(() => true)
														}
													}}
													className="border-b border-gray-600 border-dashed hover:text-black"
												>
													clear cart
												</span>
												<span className="hover:text-black">
													<Link href="/checkout">
														<span className="flex items-center">
															<span className="mr-1 border-b border-gray-600 border-dashed">
																checkout
																{' '}
															</span>
															<span className="w-4 h-4">
																<CarbonSend />
															</span>
														</span>
													</Link>
												</span>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</OutsideCloseCart>
			</div>
			<style jsx>
				{`
					::-webkit-scrollbar {
						display: none;
					}
				`}
			</style>
		</>
	)
}

export default Cart
