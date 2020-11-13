/* eslint-disable react/require-default-props */
import { Image } from 'react-datocms'
import Link from 'next/link'

export default function CoverImage({
  productName, responsiveImage, slug, rotate = false, shadow = true,
}:{
  productName: string, responsiveImage: any, slug?: string, rotate?: boolean, shadow?: boolean
}) {
  let willRotate: object
  if (rotate) {
    willRotate = {
      transform: 'rotateY(20deg) rotateX(10deg)',
      filter: 'drop-shadow(-10px 10px 0 rgb(255 255 255 / 10%))',
    }
  } else {
    willRotate = { transform: 'rotateY(0deg) rotateX(0deg)' };
  }
  const image = (
    <Image
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${productName}`,
      }}
      className={`${shadow && 'hover:shadow-4xl shadow-3xl'} transition-shadow duration-200 hover:-translate-y-1 transform`}
      style={willRotate}
    />
  )
  return (
    <div className="transition duration-200 ease-in transform cursor-pointer sm:mx-0 hover:-translate-y-1" style={{ perspective: '1000px' }}>
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
