/* eslint-disable react/no-array-index-key */
import StarFilled from '@carbon/icons-react/lib/star--filled/24'
import Star from '@carbon/icons-react/lib/star/24'

const Rating = ({ rating }: { rating: number }) => {
	const ratingRounded = Math.round(rating)
	return (
		<div className="flex justify-center w-full mt-4 sm:justify-start">
			{[...Array(ratingRounded)].map((value: undefined, index: number) => (
				<StarFilled className="text-yellow-400" key={index} />
			))}
			{[...Array(5 - ratingRounded)].map((value: undefined, index: number) => (
				<Star key={index + ratingRounded} className="text-gray-300" />
			))}
		</div>
	)
}

export default Rating
