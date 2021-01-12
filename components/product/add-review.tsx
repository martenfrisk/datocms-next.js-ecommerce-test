import ReactStarsRating from 'react-awesome-stars-rating'
import { useState } from 'react'
import { addNewReview } from '@/lib/airapi'

const AddReview = ({ productId }: { productId: string }) => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		comment: '',
		show_email: true,
	})

	const [reviewSubmitted, setReviewSubmitted] = useState(false)

	const [userRating, setUserRating] = useState(0)

	const handleChange = (event: any) => {
		const { name, value } = event.target
		setUser((prev) => ({ ...prev, [name]: value }))
	}
	const handleRating = (value: any) => {
		setUserRating(() => value)
	}

	const singleLine = (value, inputName, id, label) => (
		<div className="flex flex-col w-1/2 ">
			<span className="text-xs transform translate-y-1">
				{label}
			</span>
			<input
				className={`px-1 py-1 text-white bg-blue-700 border border-transparent rounded-sm ${value === '' && ' border-red-500'}`}
				type="text"
				id={id}
				value={value}
				name={inputName}
				onChange={handleChange}
			/>
		</div>
	)

	const submitReview = () => {
		addNewReview(
			productId,
			userRating.toString(),
			user.name,
			user.email,
			user.comment,
			user.show_email,
		)
		setReviewSubmitted(true)
	}

	return (
		<>
			{reviewSubmitted ? (
				<p className="flex flex-col w-1/2 px-4 py-3 mt-4 bg-blue-100 bg-opacity-25 rounded-lg ">
					Your review has been submitted
				</p>

			) : (

				<details className="z-30 flex flex-col w-1/2 px-4 py-3 mt-4 bg-blue-100 bg-opacity-25 rounded-lg ">
					<summary className="mb-1 cursor-pointer focus:outline-none">Review this product</summary>
					<p className="text-xs transform translate-y-1">Rating</p>
					<ReactStarsRating value={userRating} onChange={handleRating} isEdit isHalf={false} primaryColor="#FCD34D" className="flex focus:outline-none" />
					<span>
						(
						{userRating}
						)
					</span>
					{singleLine(user.name, 'name', 'userName', 'Name')}
					{singleLine(user.email, 'email', 'userEmail', 'Email')}
					<p className="text-xs transform translate-y-1">Comment</p>
					<textarea className={`w-1/2 shadow-md border text-white bg-blue-700 border-transparent ${user.comment === '' && 'border-red-500'}`} id="userComment" value={user.comment} name="comment" onChange={handleChange} />
					<div className="flex flex-wrap">
						<h3 className="w-full">Show email in review?</h3>
						<div>
							Yes
							<input
								type="radio"
								id="show_emailTrue"
								checked={user.show_email}
								name="show_email"
								className="mx-2"
								onChange={() => setUser((prev) => ({ ...prev, show_email: true }))}
							/>
						</div>
						<div>
							No
							<input
								type="radio"
								id="show_emailFalse"
								checked={!user.show_email}
								name="show_email"
								className="mx-2"
								onChange={() => setUser((prev) => ({ ...prev, show_email: false }))}
							/>
						</div>
					</div>
					{user.name === '' || user.email === '' || user.comment === '' ? (
						<button
							type="submit"
							className="w-1/2 px-2 py-1 mt-2 bg-blue-700 border-2 border-white rounded-md"
						>
							Enter review first
						</button>
					) : (
						<button
							type="submit"
							className="w-1/2 px-2 py-1 mt-2 bg-blue-700 border-2 border-white rounded-md"
							onClick={submitReview}
						>
							Submit review
						</button>
					)}
				</details>

			)}
		</>
	)
}

export default AddReview
