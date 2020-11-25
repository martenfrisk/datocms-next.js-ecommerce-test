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
      `linear-gradient(to right, rgba(29, 57, 92, 0.95), rgba(29, 57, 92, 0.8) 35%, transparent), url(${heroimg && heroimg.responsiveImage.src})`,
    backgroundSize: 'cover',
    backgroundPosition: '70% 10%',
    height: '70%',
    maxHeight: '500px',
  }

  return (
    <>
      <section
        className={`flex flex-wrap items-center w-screen pt-10 overflow-hidden text-white ${!heroimg && 'bg-navy-700'}`}
      >
        <div
          style={heroimg && withHeroImg}
          className="absolute top-0 w-screen pointer-events-none"
        />
        <div className="z-10 order-last w-full -mt-16 sm:mt-0 sm:order-first sm:w-1/3">
          <div ref={drag} style={{ opacity }} className="cursor-move">
            <div className="w-48 h-auto mx-auto animate-float">
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

        <div className="z-10 flex flex-col flex-wrap justify-start w-full px-2 mt-4 mb-16 sm:w-1/2 sm:flex-row">
          <div className="flex flex-col items-center w-full sm:items-start">
            <Link as={`/products/${slug}`} href="/products/[slug]">
              <a className="text-6xl font-normal hover:underline">
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
            <div className="mb-4 text-lg font-light ">
              {retailPrice}
              {' '}
              kr
            </div>
          </div>
          <div className="flex justify-center w-full sm:w-2/3">
            <p className="px-6 py-4 text-base font-thin leading-relaxed text-center bg-opacity-75 sm:text-left rounded-xl bg-navy-500" style={{ width: 'fit-content' }}>
              {descriptionShort || description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
