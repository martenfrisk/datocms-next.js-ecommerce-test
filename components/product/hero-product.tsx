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
    height: '90%',
    maxHeight: '420px',
  }

  return (
    <>
      <section
        className={`flex flex-wrap items-center w-screen pt-2 overflow-hidden text-white ${!heroimg && 'bg-navy-700'}`}
      >
        <div
          style={heroimg && withHeroImg}
          className="absolute top-0 w-screen pointer-events-none"
        />
        <div className="z-10 order-last w-full pb-12 -mt-16 sm:mt-8 sm:order-first sm:w-1/3">
          <div ref={drag} style={{ opacity }} className="cursor-move">
            <div className="w-48 h-auto mx-auto animate-float">
              <CoverImage
                productName={productName}
                responsiveImage={cover.responsiveImage}
                slug={slug}
                rotate
              />
            </div>
          </div>
        </div>

        <div className="z-0 flex flex-col flex-wrap justify-center w-full px-2 mt-4 mb-16 sm:w-1/2 sm:flex-row">
          <Link as={`/products/${slug}`} href="/products/[slug]">
            <a
              className="text-6xl font-normal leading-none text-center hover:underline"
              style={{
                filter: 'drop-shadow(-4px 4px 5px rgb(0 0 0 / 60%))',
              }}
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
            className="flex flex-wrap justify-center px-2 py-2 m-2 text-base font-light leading-normal text-center text-white bg-blue-300 bg-opacity-25 shadow-xl"
            style={{
              width: 'fit-content',
              backdropFilter: 'blur(6px)',
            }}
          >
            {descriptionShort || description}
            <button
              type="button"
              className="block mr-2 text-sm font-thin text-blue-100 uppercase border-b border-opacity-25 border-dashed cursor-pointer focus:outline-none border-b-blue-100"
              onClick={handleAddToCart}
            >
              Buy
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
