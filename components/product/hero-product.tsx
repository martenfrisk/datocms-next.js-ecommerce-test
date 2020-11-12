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

  return (
    <section className="flex flex-wrap items-center mt-0 mb-16 sm:mt-8">
      <div className="order-last w-full md:order-first md:w-1/3">
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

      <div className="flex flex-col flex-wrap justify-start w-full mt-4 mb-4 md:w-1/2 md:mb-20 md:flex-row">
        <div className="flex flex-col items-center w-full md:items-start">
          <h3 className="mb-4 text-3xl leading-tight md:text-4xl">
            <Link as={`/products/${slug}`} href="/products/[slug]">
              <a className="hover:underline">
                {subname ? (
                  <>
                    <span>
                      {productName}
                      :
                      {' '}
                    </span>
                    <span className="text-2xl md:text-3xl">
                      {subname}
                    </span>
                  </>
                ) : (
                  <span>{productName}</span>
                )}
              </a>
            </Link>
          </h3>
          <div className="mb-4 text-lg">
            {retailPrice}
            {' '}
            kr
          </div>
        </div>
        <div className="hidden w-full md:w-1/2 md:block">
          <p className="px-4 py-2 text-sm font-light leading-relaxed bg-opacity-75 rounded-md bg-blueish-400">
            {descriptionShort || description}
          </p>
        </div>
      </div>
    </section>
  );
}
