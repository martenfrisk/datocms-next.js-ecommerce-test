import Link from 'next/link';
import CoverImage from '../cover-image';

export default function HeroProduct({
  productName,
  slug,
  description,
  descriptionShort,
  retailPrice,
  cover,
}) {
  return (
    <section className="flex mb-16 items-center flex-wrap">
      <div className="w-full order-last md:order-first md:w-1/3">
        <div className="w-48 mx-auto h-48 mb-8">
          <CoverImage
            productName={productName}
            responsiveImage={cover.responsiveImage}
            slug={slug}
            rotate
          />
        </div>
      </div>

      <div className="w-full mt-4 md:w-2/3 mb-4 md:mb-20 flex-wrap flex flex-col md:flex-row justify-center">
        <div className="w-full flex items-center md:items-start flex-col">
          <h3 className="mb-4 text-3xl lg:text-4xl leading-tight">
            <Link as={`/products/${slug}`} href="/products/[slug]">
              <a className="hover:underline">{productName}</a>
            </Link>
          </h3>
          <div className="mb-4 text-lg">
            {retailPrice}
            {' '}
            kr
          </div>
        </div>
        <div className="w-full hidden md:block">
          <p className="text-sm font-light leading-relaxed md:mr-48">
            {descriptionShort || description}
          </p>
        </div>
      </div>
    </section>
  );
}
