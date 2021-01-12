/* eslint-disable react/jsx-no-undef */
import Link from 'next/link'
import { useEffect } from 'react'
import Image from 'next/image'
import { useDrag } from 'react-dnd'
// import CoverImage from '@/components/cover-image'
import { useCart, useDispatchCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'

export default function HeroProduct({
	productName,
	artnr,
	subname,
	slug,
	descriptionShort,
	retailPrice,
	heroimg,
	cover,
}: ProductType) {
	const dispatch: any = useDispatchCart()
	const { showCart, dragging } = useCart()
	const [, setVisible] = showCart

	const [, setCurrentlyDragging] = dragging

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

	const opacity = isDragging ? 0.4 : 1

	// const withHeroImg = {
	//   backgroundImage:
	//     `linear-gradient(to right,
	// rgba(29, 57, 92, 0.95),
	// rgba(29, 57, 92, 0.8) 35%, transparent), url(${heroimg && heroimg.responsiveImage.src})`,
	//   backgroundSize: 'cover',
	//   backgroundPosition: '70% 10%',
	//   height: '90%',
	//   maxHeight: '420px',
	// }

	return (
		<>
			<div
				className="absolute top-0 object-cover w-full mt-20 overflow-hidden sm:mt-0 bg-gradient-to-r from-blue-700 to-blue-800"
				style={{
					height: '50vh',
					minHeight: '380px',
					maxHeight: '420px',
				}}
			>
				<Image
					unoptimized
					alt=""
					layout="fill"
					src={heroimg}
					className="absolute top-0 z-0 object-cover w-screen h-full opacity-50 hero"
				/>
			</div>
			<section
				className={`flex  flex-wrap justify-center max-w-6xl mx-auto items-center w-full pt-2 overflow-hidden text-white ${!heroimg && 'bg-navy-700'}`}
			>
				<div ref={drag} style={{ opacity }} className="z-10 flex justify-center w-full cursor-move sm:pb-12 sm:pl-20 sm:mt-8 sm:w-1/3 animate-float">
					<img
						alt=""
						src={cover}
						height={500}
						width={500}
						className="rotate"
					/>
				</div>

				<div className="z-0 flex flex-col flex-wrap items-center justify-center w-full px-2 mb-16 sm:mt-4 sm:w-1/2 lg:w-1/3">
					<Link href={`/products/${encodeURIComponent(artnr)}`}>
						<a
							className="text-6xl font-normal leading-none text-center hover:underline"
						>
							{subname ? (
								<span>
									{productName}
									:
									{' '}
									{subname}
								</span>
							) : (
								<span>{productName}</span>
							)}
						</a>
					</Link>
					<p
						className="px-4 py-3 m-2 mt-4 text-base font-light leading-normal text-center text-white bg-blue-300 bg-opacity-50 shadow-xl"
					>
						{descriptionShort}
					</p>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps({
	heroimg,
}: ProductType) {
	const heroBg = heroimg
	return {
		props: { heroBg },
	}
}
