/* eslint-disable camelcase */
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Head from 'next/head'
import ProductBody from '@/product/product-body';
import Header from '@/components/header';
import Layout from '@/components/layout';
import Rating from '@/components/rating'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { AirProduct, ProductType, UserReview } from '@/lib/types'
import OutsideCloseCart from '@/lib/click-outside'
import ProductTitle from '@/product/product-title';
// import markdownToHtml from '@/lib/markdownToHtml';
import {
	getAllProducts, getGradeFromId, getProductByArtnr, getReviewsByProductId,
} from '@/lib/airapi';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MoreProducts = dynamic(import('@/product/more-products'))
const AddReview = dynamic(import('@/components/product/add-review'))

export default function Product({
	product, moreProducts, rating, reviews,
}: {
	product: ProductType,
	moreProducts: ProductType[],
	rating: any,
	reviews: UserReview[]
 }) {
	const dispatch: any = useDispatchCart()
	// const [grade, setGrade] = useState<number>()
	const [loggedIn, setLoggedIn] = useState<boolean>()
	useEffect(() => {
		// if (rating.grade) {
		// 	setGrade(() => Number(rating.grade))
		// } else {
		// 	setGrade(() => Number(0))
		// }
		if (window.localStorage.getItem('user_data')) setLoggedIn(true)
	}, [rating.grade])
	const { showCart } = useCart()
	const [, setVisible] = showCart
	// const samePlatform = moreProducts.filter((item) => item.platform === product.platform)
	// const otherPlatforms = moreProducts.filter((item) => item.platform !== product.platform)
	// const plat1 = []; const plat2 = []
	// otherPlatforms.map((prod: ProductType, index: number) => {
	// 	if (index === 0) {
	// 		plat1.push(prod)
	// 	} else if (plat1[0].platform === prod.platform) {
	// 		plat1.push(prod)
	// 	} else {
	// 		plat2.push(prod)
	// 	}
	// 	return null
	// })
	// otherPlatforms.sort((a: any, b: any) => {
	// 	if (a.platform < b.platform) {
	// 		return -1
	// 	}
	// 	if (a.platform > b.platform) {
	// 		return 1
	// 	}
	// 	return 0
	// })
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
		<Layout showCartButton="true">
			<Header />
			<article className="px-8 pt-32 pb-6 mb-6 -mt-32 text-white bg-gradient-to-r from-blue-800 to-blue-600">
				<Head>
					<title>
						{product.productName}
						{' '}
						| Next.js Ecommerce Example
					</title>
				</Head>
				<ProductTitle>
					{product.productName}
				</ProductTitle>
				<div className="flex flex-col items-center md:items-start md:flex-row ">
					<div className="flex items-center w-2/3 h-full sm:w-1/4">
						<Image
							unoptimized
							src={product.cover}
							width={300}
							height={300}
						/>
					</div>

					<div className="flex flex-col flex-wrap w-full sm:flex-row md:w-1/2 md:pl-8">
						<div className="flex flex-wrap justify-center w-full px-4 mt-4 sm:px-10 sm:justify-start md:mt-0 md:px-0 md:w-2/3">
							{product.descriptionShort && (
								<p className="w-full mb-2 text-base italic font-light leading-snug text-center sm:mb-4 sm:text-xl">{product.descriptionShort}</p>
							)}
							<p className="mr-4 text-2xl font-light">
								{product.retailPrice}
								:-
							</p>
							<OutsideCloseCart>
								<button
									type="button"
									className="px-6 py-1 text-lg text-white uppercase transition-all duration-300 bg-blue-500 rounded-md cursor-pointer bg-opacity-95 hover:bg-blue-600"
									onClick={handleAddToCart}
								>
									Buy
								</button>
							</OutsideCloseCart>
						</div>
						{rating.grade !== 0 && <Rating rating={rating.grade} />}
						<div className="w-full px-4 pt-6 md:px-0 md:w-2/3">
							<ProductBody content={product.description} />
						</div>
						{loggedIn ? (
							<AddReview productId={product.artnr} />
						) : (
							<p className="w-full mt-4">
								<Link href="/user/profile">
									<a className="italic underline">
										Log in
									</a>
								</Link>
								{' '}
								to leave a review
							</p>
						)}
					</div>
					{reviews.length > 0 && (
						<div className="flex flex-col w-full md:w-1/4">
							<h3 className="mb-2 text-lg">Reviews</h3>
							{reviews.map((review: UserReview) => (
								<div className="mb-4" key={review.time}>
									<Rating rating={Number(review.grade)} />
									<p>
										&quot;
										{review.comment}
										&quot;
									</p>
									<p className="text-sm italic">
										-
										{review.name}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</article>
			{moreProducts.length > 0 && (
				<MoreProducts products={moreProducts} header="More Video Games" />
			)}
		</Layout>
	);
}

export async function getServerSideProps({ params }) {
	const data = await getProductByArtnr(decodeURIComponent(params.slug));
	let product: ProductType
	let rating: any
	let reviews: any[]
	if (data) {
		// console.log(JSON.stringify(data, null, 2))
		product = {
			productName: data.article.title,
			artnr: data.article.id,
			slug: data.article.friendly_url === null ? data.article.title.toLowerCase().replace(' ', '') : data.article.friendly_url,
			description: data.article.description,
			descriptionShort: data.article.short_description,
			retailPrice: data.article.price.toString(),
			cover: `http://martenf1.cdsuperstore.se${data.article.image.large}`,
			platform: data.article.categories.toString(),
			rating: data.article.avg_grade,
		}
	}
	if (product) {
		const { avg_grade } = await getGradeFromId(data.article.id)
		const { grades } = await getReviewsByProductId(data.article.id)
		reviews = grades
		rating = avg_grade
	}
	const moreProducts = await getAllProducts('8')
	const products = []
	moreProducts.brand.article_list.articles.forEach((x: AirProduct) => {
		const newObj = {
			productName: x.title,
			artnr: x.id,
			slug: x.friendly_url === null ? x.title.toLowerCase().replace(' ', '') : x.friendly_url,
			description: x.description,
			descriptionShort: x.short_description,
			retailPrice: x.price,
			cover: `http://martenf1.cdsuperstore.se${x.image.normal}`,
			heroimg: `http://martenf1.cdsuperstore.se${x.image.large}`,
			platform: 'Video Game',
		}
		products.push(newObj)
	})
	// const description = await markdownToHtml(data?.product?.description || '');

	return {
		props: {
			product,
			moreProducts: products,
			rating,
			reviews: reviews || null,
		},
	};
}
