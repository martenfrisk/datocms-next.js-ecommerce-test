/* eslint-disable no-console */
import Link from 'next/link'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import CoverImage from '@/components/cover-image'
// import { Preview } from 'react-dnd-multi-backend'
import { useDrag } from 'react-dnd'
import { useEffect } from 'react'

export default function ProductPreview({
  productName,
  slug,
  description,
  descriptionShort,
  retailPrice,
  cover,
}: {
    productName: ProductType['productName'],
    slug: ProductType['slug'],
    description: ProductType['description'],
    descriptionShort: ProductType['descriptionShort'],
    retailPrice: ProductType['retailPrice'],
    cover: ProductType['cover']
}) {
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
  const opacity = isDragging ? 0.4 : 1
  // const generatePreview = (type, item, style) => (
  //   <div style={style}><img src={cover.responsiveImage} alt="" /></div>
  // )

  return (
    <>
      {/* <Preview generator={generatePreview} /> */}
      <div className="w-1/2 px-2 sm:w-1/3 lg:w-1/4 sm:px-4">
        <div ref={drag} style={{ opacity }} className="cursor-move">
          <div className="mb-5">
            <CoverImage
              slug={slug}
              productName={productName}
              responsiveImage={cover.responsiveImage}
            />
            <button
              type="button"
              className="absolute px-2 py-1 ml-1 -mt-10 text-white bg-gray-700 cursor-pointer bg-opacity-75 rounded-md focus:outline-none transform hover:-translate-y-1 transition-all duration-100 hover:shadow-md"
              onClick={handleAddToCart}
            >
              Buy
            </button>
          </div>
          <h3 className="mb-1 text-xl leading-snug tracking-tight">
            <Link as={`/products/${slug}`} href="/products/[slug]">
              <a className="hover:underline">{productName}</a>
            </Link>
          </h3>
          <div className="mb-4 text-sm">
            {retailPrice}
            {' '}
            kr
          </div>
          <p className="hidden mb-8 text-sm font-light leading-snug md:block">{descriptionShort || description}</p>
        </div>
      </div>
    </>
  )
}
