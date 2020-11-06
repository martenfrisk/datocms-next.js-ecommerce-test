/* eslint-disable react/no-array-index-key */
import { StarFilled24 } from '@carbon/icons-react'

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex w-full justify-center sm:justify-start mt-4">
    {rating && (
      [...Array(rating)].map((value: undefined, index: number) => (
        <StarFilled24 className="text-yellow-400" key={index} />
      ))
    )}
    {rating && (
      [...Array(5 - rating)].map((value: undefined, index: number) => (
        <StarFilled24 key={index + rating} className="text-gray-300" />
      ))
    )}
    {!rating && (
      [...Array(5)].map((value: undefined, index: number) => (
        <StarFilled24 key={index + rating} className="text-gray-300" />
      ))
    )}
  </div>
)

export default Rating
