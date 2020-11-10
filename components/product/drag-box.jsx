/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { Preview } from 'react-dnd-multi-backend'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/lib/types'

const Box = ({ product, image }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { product, type: ItemTypes.PRODUCT },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(`You dropped ${item.product}.`)
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  const generatePreview = (type, item, style) => (
    <div style={style}><img src={image} alt="" /></div>
  )
  return (
    <>
      <Preview generator={generatePreview} />
      <div ref={drag} style={{ opacity }} className="cursor-move">
        {product}
      </div>
    </>
  )
}

export default Box
