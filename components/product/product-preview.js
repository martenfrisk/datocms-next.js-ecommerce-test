import CoverImage from '../cover-image'
import Link from 'next/link'

export default function ProductPreview({
    productId,
    productName,
    slug,
    retailPrice,
}) {
  return (
    <div className="flex mb-2 md:mb-4 mx-1 md:mx-4 w-1/3 md:w-1/4 justify-between items-start flex-col">
      <div className="mb-5 mx-auto">
        <CoverImage
          slug={slug}
          productName={productName}
          responsiveImage={productId}
        />
      </div>
      <h3 className="text-sm  md:text-2xl mb-3 leading-tight tracking-tight">
        <Link as={`/products/${slug}`} href="/products/[slug]">
          <a className="hover:underline">{productName}</a>
        </Link>
      </h3>
      <div className="text-xs md:text-lg mb-4">
        {retailPrice} kr
      </div>
      {/* <p className="text-sm hidden md:block font-light leading-snug mb-4">{descriptionShort ? descriptionShort : description}</p> */}
    </div>
  )
}
