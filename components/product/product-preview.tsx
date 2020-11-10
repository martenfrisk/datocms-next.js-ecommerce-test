/* eslint-disable no-console */
import Link from 'next/link'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { ProductType, ItemTypes } from '@/lib/types'
import CoverImage from '@/components/cover-image'
// import { Preview } from 'react-dnd-multi-backend'
import { useDrag } from 'react-dnd'

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
  const { state, showCart } = useCart()
  const [, setVisible] = showCart
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
  const opacity = isDragging ? 0.4 : 1
  // const generatePreview = (type, item, style) => (
  //   <div style={style}><img src={cover.responsiveImage} alt="" /></div>
  // )

  return (
    <>
      {/* <Preview generator={generatePreview} /> */}
      <div className="w-1/2 sm:w-1/3 lg:w-1/4 px-2 sm:px-4">
        <div className="mb-5">
          <div ref={drag} style={{ opacity }} className="cursor-move">
            <CoverImage
              slug={slug}
              productName={productName}
              responsiveImage={cover.responsiveImage}
            />
          </div>
        </div>
        <h3 className="text-xl mb-1 leading-snug tracking-tight">
          <Link as={`/products/${slug}`} href="/products/[slug]">
            <a className="hover:underline">{productName}</a>
          </Link>
        </h3>
        <div className="text-sm mb-4">
          {retailPrice}
          {' '}
          kr
        </div>
        <p className="text-sm hidden md:block font-light leading-snug mb-8">{descriptionShort || description}</p>
      </div>
    </>
  )
}
