import Link from "next/link";
import CoverImage from "../cover-image";

export default function HeroProduct({
  productName,
  slug,
  description,
  descriptionShort,
  retailPrice,
  cover,
}) {
  return (
    <section className="flex items-center flex-wrap">
<div className="w-1/3">

      <div className="w-48 mx-auto h-48 mb-8">
        <CoverImage
          productName={productName}
          responsiveImage={cover.responsiveImage}
          slug={slug}
          />
      </div>
          </div>

      <div className="w-2/3 mb-20 flex-wrap flex justify-center">
        <div className="w-full">
          <h3 className="mb-4 text-2xl lg:text-4xl leading-tight">
            <Link as={`/products/${slug}`} href="/products/[slug]">
              <a className="hover:underline">{productName}</a>
            </Link>
          </h3>
          <div className="mb-4 text-lg">{retailPrice} kr</div>
        </div>
        <div className="w-full">
          <p className="text-sm font-light leading-relaxed mr-48">
            {descriptionShort ? descriptionShort : description}
          </p>
        </div>
      </div>

    </section>
  );
}
