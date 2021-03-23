import dynamic from 'next/dynamic'
import { ProductType } from '@/lib/types'

const ProductPreview = dynamic(import('@/product/product-preview'))

type MoreProductsProps = {
  products: ProductType[]
}

export default function MoreProducts(
	{
		products, header = '', animateFirst = false,
	}: {
    products: MoreProductsProps['products'], header?: string, animateFirst?: boolean
  },
): React.ReactElement<MoreProductsProps> {
	return (
		<section className="z-10 bg-white text-blueish-800">
			{header !== '' && (
				<h2
					className="py-1 pl-4 pr-16 mb-2 text-2xl text-white sm:mb-6 bg-gradient-to-tr from-blue-800 to-blue-600 sm:text-3xl"
					style={{ clipPath: 'polygon(0 0, 100% 0%, 90% 100%, 0% 100%)', width: 'fit-content' }}
				>
					{header}
				</h2>
			)}
			<div className="flex flex-wrap max-w-5xl mx-auto mb-0">
				{products.map((product, index) => (
					<ProductPreview
						key={product.slug}
						productName={product.productName}
						artnr={product.artnr}
						subname={product.subname}
						slug={product.slug}
						description={product.description}
						descriptionShort={product.descriptionShort}
						retailPrice={product.retailPrice}
						cover={product.cover}
						animate={animateFirst && index === 0}
					/>
				))}
			</div>
		</section>
	);
}

MoreProducts.defaultProps = {
	header: '',
	animateFirst: false,
}
