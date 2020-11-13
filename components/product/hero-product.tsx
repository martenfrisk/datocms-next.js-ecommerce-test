import Link from 'next/link'
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import CoverImage from '@/components/cover-image'
import { useCart, useDispatchCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'

export default function HeroProduct({
  productName,
  subname,
  slug,
  description,
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

  const withHeroImg = {
    backgroundImage:
      `linear-gradient(to right, rgba(29, 57, 92, 0.95), rgba(29, 57, 92, 0.8) 35%, transparent), url(${heroimg.responsiveImage.src})`,
    backgroundSize: 'cover',
    backgroundPosition: '70% 10%',
  }

  return (
    <>
      <section
        style={withHeroImg}
        className="absolute top-0 flex flex-wrap items-center w-screen pt-48 mt-0 overflow-hidden"
      >
        <div className="z-10 order-last w-full md:order-first md:w-1/3">
          <div ref={drag} style={{ opacity }} className="cursor-move">
            <div className="w-48 h-48 mx-auto mb-8 animate-float">
              <CoverImage
                productName={productName}
                responsiveImage={cover.responsiveImage}
                slug={slug}
                rotate
              />
              <button
                type="button"
                className="absolute px-2 py-1 ml-2 -mt-12 text-xl text-white transition-all duration-100 transform bg-gray-700 bg-opacity-75 rounded-md cursor-pointer focus:outline-none hover:-translate-y-1 hover:shadow-md"
                onClick={handleAddToCart}
                style={{
                  transform: 'rotateY(20deg) rotateX(10deg)',
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>

        <div className="z-10 flex flex-col flex-wrap justify-start w-full px-2 mt-4 mb-4 md:w-1/2 md:mb-20 md:flex-row">
          <div className="flex flex-col items-center w-full md:items-start">
            <h3 className="text-3xl font-thin tracking-wide md:text-4xl">
              <Link as={`/products/${slug}`} href="/products/[slug]">
                <a className="hover:underline">
                  {subname ? (
                    <>
                      <span>
                        {productName}
                        :
                        {' '}
                      </span>
                      <span>
                        {subname}
                      </span>
                    </>
                  ) : (
                    <span>{productName}</span>
                  )}
                </a>
              </Link>
            </h3>
            <div className="mb-4 text-lg font-light ">
              {retailPrice}
              {' '}
              kr
            </div>
          </div>
          <div className="hidden w-full md:w-2/3 md:block">
            <p className="px-6 py-4 text-sm font-thin leading-relaxed bg-opacity-75 rounded-xl bg-navy-500">
              {descriptionShort || description}
            </p>
          </div>
        </div>
      </section>
      <style jsx>
        {`
            .heroimage {
              height: 30.4rem;
        }
      `}
      </style>
    </>
  );
}
