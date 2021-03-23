import { ProductType } from '@/lib/types';
import Link from 'next/link'
import ImageOpt from '@/components/image'

import {
	BasketPlusOutline,
	StarOutline,
	StarSharp,
} from '@/components/icons'
import { addToWishlist, removeFromWishlist } from '@/lib/airapi';
import { useState } from 'react';
import { useDispatchCart, useCart } from '../cart/cart-context';

const ProductListView = ({
	i,
	product,
}: { i: number, product: ProductType }) => {
	const [onWishlist, setOnWishlist] = useState<Boolean>(null)
	const dispatch: any = useDispatchCart()
	const { showCart } = useCart()
	const [, setVisible] = showCart
	function isAuthenticated() {
		try {
			const value = window.localStorage.getItem('user_data');
			return value ? JSON.parse(value) : null;
		} catch (e) {
			return null
		}
	}
	const handleAddToWishlist = async () => {
		const user = isAuthenticated()
		if (user !== null) {
			const res = await addToWishlist(product.artnr, user)
			if (res === 1) setOnWishlist(true)
		}
	}
	const handleRemoveFromWishlist = async () => {
		const user = isAuthenticated()
		if (user !== null) {
			const res = await removeFromWishlist(product.artnr, user)
			if (res === 1) setOnWishlist(false)
		}
	}
	const handleAddToCart = () => {
		dispatch({
			type: 'ADD_ITEM',
			payload: {
				item: product.productName,
				price: product.retailPrice,
				quantity: 1,
				slug: product.slug,
				responsiveImage: product.cover,
			},
		})
		setVisible(true)
	}
	return (
		<div className={`${i % 2 === 0 ? 'bg-blue-100' : 'bg-white'} hover:shadow-md justify-between flex my-2 px-2 py-2 items-center cursor-pointer`}>
			<div className="w-20">
				<ImageOpt width={300} height={300} src={product.cover} className="w-full h-full" />
				{
					/* <Image
          width={300}
          height={300}
          src={`/images/${product.cover}`}
          /> */
				}
			</div>
			<div className="flex flex-wrap justify-between w-4/5 px-2 sm:px-4">
				<p className="w-full sm:w-auto">

					<Link href={`/products/${encodeURIComponent(product.artnr)}`}>
						<a className="text-lg">
							{product.productName}
						</a>
					</Link>
				</p>
				<div className="flex justify-between w-full">
					<div className="flex items-center justify-start w-40 space-x-4">
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
					<p className="whitespace-nowrap">
						<span className="mr-2 text-sm text-gray-600">
							{product.platform.map((plat) => {
								switch (plat) {
								case '8':
									return 'Nintendo 64';

								case '9':
									return 'Playstation';

								case '10':
									return 'Game Boy';

								default:
									return '';
								}
							})}
						</span>
						{product.retailPrice}
						&nbsp;:-
					</p>
				</div>
			</div>
		</div>
	)
}

export default ProductListView
