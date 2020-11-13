/* eslint-disable no-console */
import Link from 'next/link'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import CoverImage from '@/components/cover-image'
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
  platform,
  animate,
}: {
    productName: ProductType['productName'],
    subname: ProductType['subname'],
    slug: ProductType['slug'],
    description: ProductType['description'],
    descriptionShort: ProductType['descriptionShort'],
    retailPrice: ProductType['retailPrice'],
    platform: ProductType['platform'],
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
  // const generatePreview = (type, item, style) => (
  //   <div style={style}><img src={cover.responsiveImage} alt="" /></div>
  // )

  return (
    <>
      {/* <Preview generator={generatePreview} /> */}
      <div className="w-full my-2 rounded-lg sm:my-12 sm:mx-4 shadow-3xl bg-navy-400 sm:w-1/3 lg:w-1/4 ">
        <div className="flex flex-row flex-wrap items-start sm:mb-5 sm:flex-col">
          <div ref={drag} style={{ opacity }} className={`${animate && 'animate-smallbounce'} self-center flex justify-center cursor-move w-1/3 mt-1 sm:w-full sm:-mt-12 sm:mb-2`}>
            {animate && showDragTooltip && (
              <div className="absolute flex items-center justify-around w-auto px-1 py-px mx-auto -mt-6 space-x-2 text-xs text-center bg-white border border-gray-300 rounded-lg shadow-md sm:ml-2 sm:-mt-8 sm:px-4">
                <span>
                  Try dragging me
                </span>
                <Touch1 className="hidden sm:inline-block" />
              </div>
            )}
            <div>
              <CoverImage
                slug={slug}
                productName={productName}
                responsiveImage={cover.responsiveImage}
              />
              <button
                type="button"
                className="absolute px-2 py-1 -mt-12 font-normal tracking-wide transition-all duration-100 transform bg-white cursor-pointer bg-opacity-95 text-blueish-600 focus:outline-none hover:-translate-y-px hover:shadow-md"
                onClick={handleAddToCart}
              >
                Buy
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-end w-2/3 sm:w-full">
            <h3 className="w-full px-4 py-2 text-xl leading-snug tracking-tight from-gray-100 to-gray-200 bg-gradient-to-b">
              <Link as={`/products/${slug}`} href="/products/[slug]">
                <a className="flex flex-col hover:underline">
                  {subname ? (
                    <>
                      <span className="text-sm">
                        {productName}
                      </span>
                      <span className="text-base">
                        {subname}
                      </span>
                    </>
                  ) : (
                    <span>{productName}</span>
                  )}
                </a>
              </Link>
            </h3>
            <div className="px-1 -mt-2 text-xs bg-white border border-opacity-75 rounded-lg border-navy-500 sm:-mt-3 sm:px-2 sm:text-sm sm:mr-2 bg-opacity-95 text-navy-500">
              {retailPrice}
              {' '}
              kr
            </div>
            <p className="hidden px-4 my-0 text-sm font-thin leading-4 text-white sm:block">{descriptionShort || description}</p>
            <p className="block w-full px-4 text-sm font-light leading-snug text-white sm:hidden">{platform}</p>
          </div>
        </div>
      </div>
    </>
  )
}

ProductPreview.defaultProps = {
  animate: false,
}
