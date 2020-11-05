/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import CoverImage from '../cover-image'
import ProductTitle from './product-title'

export default function ProductHeader({
  productName,
  cover,
}: {
  productName: string;
  cover: { responsiveImage: any };
}) {
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
  );
}
