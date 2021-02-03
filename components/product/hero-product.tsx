/* eslint-disable react/jsx-no-undef */
import Link from 'next/link'
import { useEffect } from 'react'
// import Image from 'next/image'
import { useDrag } from 'react-dnd'
import { useCart, useDispatchCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import ImageOpt from '@/components/image'

export default function HeroProduct({
	productName,
	artnr,
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

	return (
		<>
			<div
				className="absolute top-0 flex justify-center w-full mt-20 overflow-hidden border-b-4 border-blue-700 shadow-sm sm:mt-0 bg-gradient-to-r from-blue-700 to-blue-800"
				style={{
					height: '50vh',
					minHeight: '380px',
					maxHeight: '425px',
				}}
			>
				<div className="w-full">

					{/* <Image
						src={`/images/zoom/${heroimg}.jpg`}
						alt={`Cover for ${productName}`}
						layout="fill"
						objectPosition="75% 25%"
						priority
						// width={1200}
						// height={400}
						className="z-0 object-cover opacity-50 hero"
					/> */}
					<picture>
						<source srcSet={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/zoom/${heroimg}.avif`} type="image/avif" />
						<source srcSet={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/zoom/${heroimg}.webp`} type="image/webp" />
						<img
							src={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/zoom/${heroimg}.jpg`}
							alt={`Cover for ${productName}`}
							loading="eager"
							className="z-0 mx-auto opacity-50"
							width={1440}
							height={809}
							style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)', maxWidth: '1440px'	}}
						/>
					</picture>
				</div>

			</div>
			<section
				className={`flex flex-wrap justify-center max-w-6xl mx-auto items-center w-full overflow-hidden text-white ${!heroimg && 'bg-navy-700'}`}
			>
				<div ref={drag} style={{ opacity }} className="z-10 flex justify-center w-1/2 shadow-lg cursor-move sm:w-1/4">
					<ImageOpt
						src={cover}
						height={300}
						width={300}
						className="w-full rounded-lg"
						notLazy
					/>
					{/* <Image
						src={`/images/${cover}`}
						height={300}
						width={300}
						priority
						className="w-full"
						alt={`Cover for ${productName}`}
					/> */}
				</div>

				<div className="z-0 flex flex-col flex-wrap items-center justify-center w-full px-2 mb-16 sm:mt-4 sm:w-1/2 lg:w-1/3">
					<Link href={`/products/${encodeURIComponent(artnr)}`}>
						<a
							className="text-6xl font-normal leading-none text-center hover:underline"
						>
							<span>{productName}</span>
						</a>
					</Link>
					<p
						className="px-4 py-3 m-2 mt-4 text-base leading-normal text-center text-white bg-white bg-opacity-25 border border-gray-400 rounded-md shadow-xl"
						style={{ backdropFilter: 'blur(10px)' }}
					>
						{descriptionShort}
					</p>
				</div>
			</section>
		</>
	);
}
