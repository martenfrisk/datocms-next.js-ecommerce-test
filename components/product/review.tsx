import { UserReview } from '@/lib/types'
import ReactStarsRating from 'react-awesome-stars-rating'

const Review = ({ review }: { review: UserReview }) => (
	<div className="mb-4" key={review.time}>
		{/* <Rating rating={Number(review.grade)} /> */}
		<ReactStarsRating
			value={Number(review.grade)}
			className="flex mb-2"
			size={20}
			isEdit={false}
		/>
		<p>
			&quot;
			{review.comment}
			&quot;
		</p>
		<p className="text-sm italic">
			-
			{review.name}
		</p>
	</div>
)

export default Review
