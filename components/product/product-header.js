import CoverImage from '../cover-image'
import ProductTitle from './product-title'

export default function ProductHeader({ productName, cover }) {
  return (
    <>
      <ProductTitle>{productName}</ProductTitle>
      <div className="w-1/3 h-auto">
        <CoverImage
          productName={productName}
          responsiveImage={cover.responsiveImage}
        />
      </div>
    </>
  )
}
