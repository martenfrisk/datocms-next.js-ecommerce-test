import CoverImage from '../cover-image'
import Link from 'next/link'

export default function ProductPreview({
    productName,
    slug,
    description,
    descriptionShort,
    retailPrice,
    cover
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          productName={productName}
          responsiveImage={cover.responsiveImage}
        />
      </div>
      <h3 className="text-2xl mb-3 leading-snug">
        <Link as={`/products/${slug}`} href="/products/[slug]">
          <a className="hover:underline">{productName}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        {retailPrice} kr
      </div>
      <p className="text-sm hidden md:block font-light leading-snug mb-4">{descriptionShort ? descriptionShort : description}</p>
    </div>
  )
}
