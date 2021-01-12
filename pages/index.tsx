import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { ProductType, AirProduct } from '@/lib/types'
// import { getAllProductsForHome } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'
import { getAllProducts } from '@/lib/airapi'

const HeroProduct = dynamic(import('@/components/product/hero-product'))
const MoreProducts = dynamic(import('@/components/product/more-products'))

export default function Index(
	{ products }: {
		products: ProductType[],
	},
) {
	const heroProduct = products[0]
	const moreProducts = products.slice(1)
	return (
		<>
			<Layout showCartButton="true">
				<Head>
					<title>
						Next.js E-commerce Example with
						{CMS_NAME}
					</title>
				</Head>
				<Header />
				{heroProduct && (
					<HeroProduct
						productName={heroProduct.productName}
						artnr={heroProduct.artnr}
						slug={heroProduct.slug}
						description={heroProduct.description}
						descriptionShort={heroProduct.descriptionShort}
						retailPrice={heroProduct.retailPrice}
						cover={heroProduct.cover}
						platform={heroProduct.platform}
						heroimg={heroProduct.heroimg}
					/>
				)}
				{moreProducts && (
					<div className="sm:mt-10">
						<MoreProducts products={moreProducts} animateFirst />
					</div>
				)}
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	// const data = await getAllProductsForHome()
	const data = await getAllProducts('24')
	const products = []
	data.brand.article_list.articles.forEach((x: AirProduct) => {
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
	return {
		props: {
			products,
		},
	};
}
