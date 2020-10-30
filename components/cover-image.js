import { Image } from 'react-datocms'
// import cn from 'classnames'
import Link from 'next/link'

export default function CoverImage({ productName, responsiveImage, slug, rotate = false }) {
  let willRotate
  rotate === true ? willRotate = {transform: 'rotateY(20deg)'} : willRotate = {transform: 'rotateY(0deg)'}
  const image = (
    <Image
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${productName}`,
      }}
      className="hover:shadow-4xl shadow-3xl transition-shadow duration-200 hover:translate-y-2"
      style={willRotate}
    />
  )
  return (
    <div className="-mx-5 sm:mx-0 hover:translate-y-4" style={{ perspective: '1000px'}}>
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
