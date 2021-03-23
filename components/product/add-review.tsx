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
		<div className="flex justify-between w-full mb-1 ">
			<span className="text-xs transform translate-y-1">
				{label}
			</span>
			<input
				className={`px-1 py-1 text-white bg-blue-700 focus:border-transparent border-r-2 border-transparent rounded-sm ${value === '' && ' border-red-500'}`}
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
				<p className="flex flex-col w-full px-4 py-3 mt-4 bg-blue-100 bg-opacity-25 rounded-lg sm:w-1/2 ">
					Your review has been submitted
				</p>

			) : (

				<details className="flex flex-col items-center w-full px-4 py-3 mt-4 bg-blue-100 bg-opacity-25 rounded-lg  sm:w-1/2">
					<summary className="mb-1 cursor-pointer focus:outline-none">Review this product</summary>
					<div className="flex justify-between w-full mb-1">
						<p className="text-xs transform translate-y-1">Rating</p>
						<ReactStarsRating value={userRating} onChange={handleRating} isEdit isHalf={false} primaryColor="#FCD34D" className="flex justify-center focus:outline-none" />
					</div>
					{singleLine(user.name, 'name', 'userName', 'Name')}
					{singleLine(user.email, 'email', 'userEmail', 'Email')}
					<p className="text-xs ">Comment</p>
					<textarea className={`w-full shadow-md focus:border-transparent border-r-2 text-white bg-blue-700 border-transparent ${user.comment === '' && 'border-red-500'}`} id="userComment" value={user.comment} name="comment" onChange={handleChange} />
					<div className="flex flex-wrap justify-center w-full">
						<h3 className="w-full text-center">Show email in review?</h3>
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
					<div className="flex justify-center w-full">

						{user.name === '' || user.email === '' || user.comment === '' ? (
							<button
								type="submit"
								className="w-2/3 px-2 py-1 mt-4 font-light bg-blue-700 border border-white rounded-md"
							>
								Enter review first
							</button>
						) : (
							<button
								type="submit"
								className="w-2/3 px-2 py-1 mt-4 font-light bg-blue-700 border border-white rounded-md"
								onClick={submitReview}
							>
								Submit review
							</button>
						)}
					</div>
				</details>

			)}
		</>
	)
}

export default AddReview
