import CoverImage from '../cover-image'
import ProductTitle from './product-title'

export default function ProductHeader({ productName, cover }) {
  return (
    <>
      <ProductTitle>{productName}</ProductTitle>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage
          productName={productName}
          responsiveImage={cover.responsiveImage}
        />
      </div>
    </>
  )
}
