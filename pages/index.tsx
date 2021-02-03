import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { ProductType } from '@/lib/types'
import { getAllProducts, getTopOffer } from '@/lib/airapi'

const HeroProduct = dynamic(import('@/components/product/hero-product'))
const MoreProducts = dynamic(import('@/components/product/more-products'))

export default function Index(
	{ products, heroProduct }: {
		products: ProductType[],
		heroProduct: ProductType
	},
) {
	return (
		<>
			<Layout showCartButton="true">
				<Head>
					<title>
						Next.js E-commerce Example with Askås
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
				<div className="sm:mt-10">
					<MoreProducts products={products} animateFirst />
				</div>
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	const products = await getAllProducts(12)
	const heroProduct = await getTopOffer('9')
	return {
		props: {
			products,
			heroProduct,
		},
	};
}
