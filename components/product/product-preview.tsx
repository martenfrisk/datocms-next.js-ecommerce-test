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
  animate,
}: {
    productName: ProductType['productName'],
    subname: ProductType['subname'],
    slug: ProductType['slug'],
    description: ProductType['description'],
    descriptionShort: ProductType['descriptionShort'],
    retailPrice: ProductType['retailPrice'],
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
      <div className="w-1/2 px-2 sm:w-1/3 lg:w-1/4 sm:px-4">
        <div className="flex flex-col items-start mb-5">
          <div ref={drag} style={{ opacity }} className={`${animate && 'animate-smallbounce'} self-center cursor-move`}>
            {animate && showDragTooltip && (
              <div className="absolute flex items-center justify-around w-auto px-1 py-px mx-auto -mt-16 space-x-2 text-xs text-center bg-white border border-gray-300 rounded-lg shadow-md sm:ml-1 sm:-mt-8 sm:px-4">
                <span>
                  Try dragging me to the cart
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
                className="absolute px-2 py-1 -mt-12 font-semibold transition-all duration-100 transform bg-white cursor-pointer bg-opacity-95 text-blueish-600 focus:outline-none hover:-translate-y-px hover:shadow-md"
                onClick={handleAddToCart}
              >
                Buy
              </button>
            </div>
          </div>
          <h3 className="mb-1 text-xl leading-snug tracking-tight">
            <Link as={`/products/${slug}`} href="/products/[slug]">
              <a className="flex flex-col hover:underline">
                {subname ? (
                  <>
                    <span className="text-sm">
                      {productName}
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
          <div className="mb-4 text-sm">
            {retailPrice}
            {' '}
            kr
          </div>
          <p className="hidden mb-8 text-sm font-light leading-snug md:block">{descriptionShort || description}</p>
          {/* <style jsx>
            {`
              .speech::after {
                content: '';
                width: 2rem;
                height: 1rem;
                background: #000;
                position: absolute;
                bottom: 0;
                clip-path: polygon(0 0, 100% 0, 50% 100%);
              }
            `}
          </style> */}
        </div>
      </div>
    </>
  )
}

ProductPreview.defaultProps = {
  animate: false,
}
