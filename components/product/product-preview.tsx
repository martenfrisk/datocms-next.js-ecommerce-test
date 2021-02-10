/* eslint-disable no-console */
import Link from 'next/link'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import {
	BasketPlusOutline,
	StarOutline,
	OutlineTouchApp,
	StarSharp,
} from '@/components/icons'
// import { Preview } from 'react-dnd-multi-backend'
import { useDrag } from 'react-dnd'
import { useEffect, useState } from 'react'
// import Image from 'next/image'
import ImageOpt from '@/components/image'
import { addToWishlist, removeFromWishlist } from '@/lib/airapi'
import { useRouter } from 'next/router'

export default function ProductPreview({
	productName,
	artnr,
	subname,
	slug,
	description,
	descriptionShort,
	retailPrice,
	cover,
	animate,
}: {
		productName: ProductType['productName'],
		artnr: ProductType['artnr'],
    subname?: ProductType['subname'],
    slug: ProductType['slug'],
    description: ProductType['description'],
    descriptionShort: ProductType['descriptionShort'],
    retailPrice: ProductType['retailPrice'],
    cover: any
    animate?: boolean
}) {
	const [showDragTooltip, setShowDragTooltip] = useState(true)
	const [onWishlist, setOnWishlist] = useState<Boolean>(null)
	const router = useRouter()
	const dispatch: any = useDispatchCart()
	const { showCart, dragging } = useCart()
	useEffect(() => {
		const hasWishlist = window.localStorage.getItem('next-askas-wishlist')
		const myWishlist = hasWishlist && JSON.parse(window.localStorage.getItem('next-askas-wishlist')).some((x: any) => x.artnr === artnr)
		if (myWishlist) setOnWishlist(true)
	}, [])
	const [, setVisible] = showCart
	const [, setCurrentlyDragging] = dragging
	function isAuthenticated() {
		try {
			const value = window.localStorage.getItem('user_data');
			return value ? JSON.parse(value) : null;
		} catch (e) {
			console.error(e);
			return null
		}
	}
	const handleAddToWishlist = async () => {
		const user = isAuthenticated()
		if (user !== null) {
			const res = await addToWishlist(artnr, user)
			if (res === 1) setOnWishlist(true)
			const myWishlist = window.localStorage.getItem('next-askas-wishlist') ? JSON.parse(window.localStorage.getItem('next-askas-wishlist')) : []
			myWishlist.push({
				artnr,
				cover,
				descriptionShort,
				// platform,
				productName,
				retailPrice,
				slug,
			})
			window.localStorage.setItem('next-askas-wishlist', JSON.stringify(myWishlist))
		} else {
			router.push('/user/profile')
		}
	}
	const handleRemoveFromWishlist = async () => {
		const user = isAuthenticated()
		if (user !== null) {
			const res = await removeFromWishlist(artnr, user)
			if (res === 1) setOnWishlist(false)
			const myWishlist = JSON.parse(window.localStorage.getItem('next-askas-wishlist'))
			console.log(myWishlist)
			window.localStorage.setItem('next-askas-wishlist', JSON.stringify(myWishlist.filter((x) => x.artnr !== artnr)))
		} else {
			router.push('/user/profile')
		}
	}
	const handleAddToCart = () => {
		dispatch({
			type: 'ADD_ITEM',
			payload: {
				item: productName,
				price: retailPrice,
				quantity: 1,
				slug,
				responsiveImage: cover,
			},
		})
		setVisible(true)
	}
	const [{ isDragging }, drag] = useDrag({
		item: { cover, type: ItemTypes.PRODUCT },
		options: { dropEffect: 'copy' },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				handleAddToCart()
			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})
	useEffect(() => {
		if (isDragging) {
			setVisible(true)
			setCurrentlyDragging(true)
		} else if (!isDragging) {
			setCurrentlyDragging(false)
		}
	}, [isDragging])
	useEffect(() => {
		setTimeout(() => {
			setShowDragTooltip(false)
		}, 9000);
	}, [])
	const opacity = isDragging ? 0.4 : 1

	return (
		<>
			<div className="w-1/2 max-w-md px-2 mt-2 mb-10 sm:px-4 sm:mt-12 sm:w-1/3 lg:w-1/4">
				<div className="pb-2 bg-white shadow-xl rounded-xl">
					<div className="flex flex-col flex-wrap items-end mb-2 justify-evenly">

						<div ref={drag} style={{ opacity }} className="flex self-center justify-center w-full cursor-move sm:-mt-12 sm:mb-2">
							{animate && showDragTooltip && (
								<div className="absolute z-10 flex items-center justify-around w-auto px-1 py-px mx-auto -mt-6 text-xs text-center whitespace-no-wrap bg-white border border-gray-300 rounded-lg shadow-md sm:ml-2 sm:-mt-4 sm:px-4 animate-smallbounce">
									<span>
										Try dragging me
									</span>
									<div
										className="w-4 h-4 ml-2"
									>
										<OutlineTouchApp className="hidden sm:inline-block" />
									</div>
								</div>
							)}
							<Link href={`/products/${encodeURIComponent(artnr)}`}>
								<a className="w-full cursor-pointer" aria-label={`Link to ${productName}`}>
									<ImageOpt
										src={cover}
										width={500}
										height={500}
										className="w-full rounded-t-xl"
									/>
									{/* <Image
										alt={`Cover of ${productName}`}
										src={`/images/${cover}`}
										width={225}
										height={225}
										layout="responsive"
										className="w-full rounded-t-xl"
									/> */}
								</a>
							</Link>

						</div>
						<div className="z-10 px-2 py-1 mr-2 -mt-4 text-base font-light text-white rounded-lg shadow-lg pointer-events-none sm:-mt-6 sm:px-2 sm:py-1 justify-self-start from-blue-400 to-blue-600 bg-gradient-to-br bg-opacity-95">
							{retailPrice}
							:-
						</div>
						<h3 className="w-full px-3 py-px text-xl leading-snug tracking-tight ">
							<Link href={`/products/${encodeURIComponent(artnr)}`}>
								<a className="flex flex-col hover:underline">
									<>
										{subname && (
											<>
												<span
													className="-mb-2 text-xs text-gray-800 uppercase"
													style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
												>
													{productName}
												</span>
												<span
													className="py-px mt-1 text-lg font-light leading-none tracking-tighter md:text-xl"
													style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'hidden' }}
												>
													{subname}
												</span>
											</>
										)}
										{!subname && (
											<span
												className="py-px mt-1 mb-2 text-lg font-light leading-none tracking-tighter md:text-xl"
												style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'hidden' }}
											>
												{productName}
											</span>
										)}
									</>
								</a>
							</Link>
						</h3>
						<p
							className="hidden w-full px-3 py-0 my-0 text-xs leading-4 tracking-wide text-gray-800 lg:block "
							style={{
								WebkitLineClamp: 3,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								minHeight: '3.1rem',
							}}
						>
							{descriptionShort ? descriptionShort.replace(/(<([^>]+)>)/gi, '') : description.replace(/(<([^>]+)>)/gi, '')}
						</p>
						<div className="flex items-center justify-between w-full px-4 pt-3">
							{onWishlist ? (
								<div
									className="w-5 h-5 text-blue-700 cursor-pointer"
								>
									<StarSharp
										onClick={handleRemoveFromWishlist}
									/>
								</div>
							) : (
								<div
									className="w-5 h-5 text-blue-700 cursor-pointer"
								>
									<StarOutline
										onClick={handleAddToWishlist}
									/>
								</div>
							)}
							<div
								className="w-5 h-5 text-blue-700 cursor-pointer hover:text-blue-900"
							>
								<BasketPlusOutline
									onClick={handleAddToCart}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

ProductPreview.defaultProps = {
	animate: false,
	subname: '',
}
