import Link from 'next/link'
import { ProductType } from '@/lib/types'
import CoverImage from '../cover-image'

export default function ProductPreview({
  productName,
  slug,
  description,
  descriptionShort,
  retailPrice,
  cover,
}: {
    productName: ProductType['productName'],
    slug: ProductType['slug'],
    description: ProductType['description'],
    descriptionShort: ProductType['descriptionShort'],
    retailPrice: ProductType['retailPrice'],
    cover: ProductType['cover']

}) {
  return (
    <div className="w-1/2 sm:w-1/3 lg:w-1/4 px-2 sm:px-4">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          productName={productName}
          responsiveImage={cover.responsiveImage}
        />
      </div>
      <h3 className="text-xl mb-1 leading-snug tracking-tight">
        <Link as={`/products/${slug}`} href="/products/[slug]">
          <a className="hover:underline">{productName}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">
        {retailPrice}
        {' '}
        kr
      </div>
      <p className="text-sm hidden md:block font-light leading-snug mb-8">{descriptionShort || description}</p>
    </div>
  )
}
