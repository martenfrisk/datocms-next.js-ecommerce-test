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
    <div className="w-1/2 sm:w-1/3 px-8 sm:px-4">
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
      <p className="text-sm hidden md:block font-light leading-snug mb-4">{descriptionShort || description}</p>
    </div>
  )
}
