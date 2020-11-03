import { Image } from 'react-datocms'
import Link from 'next/link'

export default function CoverImage({ productName, responsiveImage, slug, rotate = false }) {
  let willRotate
  rotate === true
    ? (willRotate = {transform: 'rotateY(20deg) rotateX(10deg)', filter: 'drop-shadow(-15px 15px 0px rgb(0 112 243 / 50%))' })
    : (willRotate = { transform: "rotateY(0deg) rotateX(0deg)" });
  const image = (
    <Image
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${productName}`,
      }}
      className="hover:shadow-4xl shadow-3xl transition-shadow duration-200 hover:-translate-y-1 transform"
      style={willRotate}
    />
  )
  return (
    <div className="-mx-5 sm:mx-0 transition duration-200 ease-in transform hover:-translate-y-1" style={{ perspective: '1000px'}}>
      {slug ? (
        <Link as={`/products/${slug}`} href="/products/[slug]">
          <a aria-label={productName}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}