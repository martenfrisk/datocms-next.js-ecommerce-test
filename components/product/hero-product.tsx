import Link from 'next/link'
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import CoverImage from '@/components/cover-image'
import { useCart, useDispatchCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import { Image } from 'react-datocms'

export default function HeroProduct({
  productName,
  subname,
  slug,
  descriptionShort,
  retailPrice,
  heroimg,
  cover,
}: ProductType) {
  const dispatch: any = useDispatchCart()
  const { showCart, dragging } = useCart()
  const [, setVisible] = showCart

  const [, setCurrentlyDragging] = dragging

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        item: productName,
        price: retailPrice,
        quantity: 1,
        slug,
        responsiveImage: cover.responsiveImage,
      },
    })
    setVisible(true)
  }

  const [{ isDragging }, drag] = useDrag({
    item: { cover: cover.responsiveImage, type: ItemTypes.PRODUCT },
    options: { dropEffect: 'copy' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        handleAddToCart()
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  useEffect(() => {
    if (isDragging) {
      setVisible(true)
      setCurrentlyDragging(true)
    } else if (!isDragging) {
      setCurrentlyDragging(false)
    }
  }, [isDragging])

  const opacity = isDragging ? 0.4 : 1

  // const withHeroImg = {
  //   backgroundImage:
  //     `linear-gradient(to right,
  // rgba(29, 57, 92, 0.95),
  // rgba(29, 57, 92, 0.8) 35%, transparent), url(${heroimg && heroimg.responsiveImage.src})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: '70% 10%',
  //   height: '90%',
  //   maxHeight: '420px',
  // }
  const resHero = heroimg.responsiveImage

  return (
    <>
      <div
        className="absolute top-0 object-cover mt-20 overflow-hidden sm:mt-0 bg-gradient-to-r from-blue-700 to-blue-800"
        style={{
          height: '50vh',
          maxHeight: '420px',
        }}
      >
        <Image data={{ ...resHero, alt: 'Hero image' }} className="absolute top-0 z-0 object-cover w-screen h-full opacity-50 hero" />
      </div>
      <section
        className={`flex  flex-wrap justify-start items-center w-full pt-2 overflow-hidden text-white ${!heroimg && 'bg-navy-700'}`}
      >
        <div ref={drag} style={{ opacity }} className="z-10 w-1/3 pb-12 pl-20 mt-8 cursor-move animate-float">
          <CoverImage
            productName={productName}
            responsiveImage={cover.responsiveImage}
            slug={slug}
            rotate
          />
        </div>

        <div className="z-0 flex flex-col flex-wrap items-center justify-center w-full px-2 mt-4 mb-16 sm:-ml-20 sm:w-1/3">
          <Link as={`/products/${slug}`} href="/products/[slug]">
            <a
              className="text-6xl font-normal leading-none text-center hover:underline"
            >
              {subname ? (
                <span>
                  {productName}
                  :
                  {' '}
                  {subname}
                </span>
              ) : (
                <span>{productName}</span>
              )}
            </a>
          </Link>
          <p
            className="px-2 py-2 m-2 text-base font-light leading-normal text-center text-white bg-blue-300 bg-opacity-50 shadow-xl"
          >
            {descriptionShort}
          </p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({
  heroimg,
}: ProductType) {
  const heroBg = heroimg.responsiveImage.src
  return {
    props: { heroBg },
  }
}
