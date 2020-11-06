/* eslint-disable react/no-array-index-key */
import StarFilled from '@carbon/icons-react/lib/star--filled/24'

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex w-full justify-center sm:justify-start mt-4">
    {rating && (
      [...Array(rating)].map((value: undefined, index: number) => (
        <StarFilled className="text-yellow-400" key={index} />
      ))
    )}
    {rating && (
      [...Array(5 - rating)].map((value: undefined, index: number) => (
        <StarFilled key={index + rating} className="text-gray-300" />
      ))
    )}
    {!rating && (
      [...Array(5)].map((value: undefined, index: number) => (
        <StarFilled key={index + rating} className="text-gray-300" />
      ))
    )}
  </div>
)

export default Rating
