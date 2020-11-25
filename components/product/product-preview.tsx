/* eslint-disable no-console */
import Link from 'next/link'
import { Image } from 'react-datocms'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import Touch1 from '@carbon/icons-react/lib/touch--1/16'
// import { Preview } from 'react-dnd-multi-backend'
import { useDrag } from 'react-dnd'
import { useEffect, useState } from 'react'

export default function ProductPreview({
  productName,
  subname,
  slug,
  description,
  descriptionShort,
  retailPrice,
  cover,
  // eslint-disable-next-line no-unused-vars
  platform,
  animate,
}: {
    productName: ProductType['productName'],
    subname: ProductType['subname'],
    slug: ProductType['slug'],
    description: ProductType['description'],
    descriptionShort: ProductType['descriptionShort'],
    retailPrice: ProductType['retailPrice'],
    platform?: ProductType['platform'],
    cover: ProductType['cover']
    animate?: boolean
}) {
  const [showDragTooltip, setShowDragTooltip] = useState(true)
  const dispatch: any = useDispatchCart()
  const { state, showCart, dragging } = useCart()
  const [, setVisible] = showCart
  const [, setCurrentlyDragging] = dragging
  // const ref = useRef(null)
  // useOutsideClick(ref)
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
    // eslint-disable-next-line no-console
    console.log(state)
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
  useEffect(() => {
    setTimeout(() => {
      setShowDragTooltip(false)
    }, 9000);
  }, [])
  const opacity = isDragging ? 0.4 : 1
  function shorten(str: string) {
    if (str.length <= 80) return str;
    return str.substr(0, str.lastIndexOf(' ', 80));
  }
  // const generatePreview = (type, item, style) => (
  //   <div style={style}><img src={cover.responsiveImage} alt="" /></div>
  // )

  return (
    <>
      {/* <Preview generator={generatePreview} /> */}
      <div className="w-1/2 px-2 my-2 sm:my-12 md:w-1/3 lg:w-1/4 ">
        <div className="pb-2 bg-white shadow-2xl rounded-xl">
          <div className="flex flex-col flex-wrap items-end justify-end mb-2">

            <div ref={drag} style={{ opacity }} className={`${animate && 'animate-smallbounce'} self-center flex justify-center cursor-move w-full sm:-mt-12 sm:mb-2`}>
              {animate && showDragTooltip && (
                <div className="absolute flex items-center justify-around w-auto px-1 py-px mx-auto -mt-6 space-x-2 text-xs text-center bg-white border border-gray-300 rounded-lg shadow-md sm:ml-2 sm:-mt-8 sm:px-4">
                  <span>
                    Try dragging me
                  </span>
                  <Touch1 className="hidden sm:inline-block" />
                </div>
              )}

              <Image
                data={{
                  ...cover.responsiveImage,
                  alt: `Cover Image for ${productName}`,
                }}
                className="w-full rounded-t-xl"
              />

            </div>
            <div className="z-10 px-2 py-1 mr-2 -mt-5 text-sm text-white rounded-lg shadow-lg md:text-base justify-self-start from-blue-600 to-blue-800 bg-gradient-to-br bg-opacity-95">
              {retailPrice}
              :-
            </div>
            <h3 className="w-full px-3 py-2 -mt-4 text-xl leading-snug tracking-tight">
              <Link as={`/products/${slug}`} href="/products/[slug]">
                <a className="flex flex-col hover:underline">
                  {subname ? (
                    <>
                      <span className="text-sm font-bold uppercase">
                        {productName}
                      </span>
                      <span className="text-lg font-light md:text-2xl">
                        {subname}
                      </span>
                    </>
                  ) : (
                    <span className="md:text-2xl">{productName}</span>
                  )}
                </a>
              </Link>
            </h3>
            <p className="block w-full px-3 my-0 text-xs font-light leading-5 tracking-normal lg:hidden ">
              {shorten(descriptionShort) || shorten(description)}
              ...
            </p>
            <p className="hidden w-full px-3 my-0 text-base font-light leading-6 tracking-normal text-justify lg:block ">
              {descriptionShort || description}
            </p>
            <button
              type="button"
              className="pt-2 pr-4 text-xs font-light tracking-wide lowercase transition-all duration-100 transform cursor-pointer justify-self-end text-blueish-600 focus:outline-none hover:-translate-y-px"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

ProductPreview.defaultProps = {
  animate: false,
  platform: '',
}
