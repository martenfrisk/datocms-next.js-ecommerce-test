/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import {
	getCustomer, getOrder, getOrders, loginUser,
} from '@/lib/airapi'
import { UserAuthenticated, UserDetails, UserOrder } from '@/lib/methods/types'
import Link from 'next/link'

export default function Profile() {
	const [user, setUser] = useState<UserAuthenticated>(null)
	const [authenticated, setAuthenticated] = useState(false)
	const [login, setLogin] = useState({ username: 'testuser2', password: 'losen123' })
	const [userOrders, setUserOrders] = useState<UserOrder[]>(null)
	const [userDetails, setUserDetails] = useState<UserDetails>(null)
	const [showOrders, setShowOrders] = useState(false)

	const getOrderDetails = async (orderId: string) => {
		const order = await getOrder(user.pass, user.session_id, user.user, user.id, orderId)
		return order
	}

	const getUserOrders = async () => {
		const newOrder = []
		await getOrders(user.pass, user.session_id, user.user, user.id)
			.then((data) => {
				data.orders.forEach(async (singleOrder) => {
					const details = await getOrderDetails(singleOrder.id)
					const orderWithDetails = {
						...singleOrder,
						details: details.order,
					}
					newOrder.push(orderWithDetails)
				})
			})
		setUserOrders(() => newOrder)
	}

	const handleLogin = async () => {
		const { user_data } = await loginUser(login.username, login.password)
		if (user_data) {
			window.localStorage.setItem('user_data', JSON.stringify(user_data))
			setUser(user_data)
			setAuthenticated(true)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('user_data')
		setAuthenticated(false)
		setUser(null)
	}

	useEffect(() => {
		if (window.localStorage.getItem('user_data')) {
			const user_data = JSON.parse(window.localStorage.getItem('user_data'))
			setAuthenticated(true)
			setUser(user_data)
			getCustomer(user_data.pass, user_data.session_id, user_data.user, user_data.id)
				.then((data) => setUserDetails(() => data.customer))
		}
	}, [])

	useEffect(() => {
		if (authenticated) {
			getUserOrders()
		}
	}, [user])

	function SingleOrder(order: UserOrder) {
		return (
			<div className="mb-6 ">
				<div className="flex justify-between w-full mb-2">
					<div>
						#
						{order.id}
						&nbsp;
						(
						{new Date(Number(order.time) * 1000).toLocaleDateString()}
						)
					</div>
					<div>
						{order.details.total_amount_incl_vat}
						{' '}
						: -
					</div>

				</div>
				<div className="flex flex-col w-full pl-4">
					{order.details.orderrows.map((item: any) => (
						<div className="flex justify-between w-full">
							<div className="w-1/2">
								{item.article.url === '' ? (
									item.article.title
								) : (
									<Link href={`/products/${item.article.id}`}>
										{item.article.title}
									</Link>
								)}
							</div>
							<div className="w-1/4">
								x
								{item.number}
							</div>
							<div className="w-1/4 text-right">
								{item.row_price_incl_vat}
								{' '}
								: -
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	const userDeets = (
		userDetails && (
			<>
				<p className="flex justify-between">
					<span>
						Email
					</span>
					<span>
						{userDetails.email}
					</span>
				</p>
				<p className="flex justify-between">
					<span>
						First name
					</span>
					<span>
						{userDetails.delivery_address.first_name}
					</span>
				</p>
				<p className="flex justify-between">
					<span>
						Last name
					</span>
					<span>
						{userDetails.delivery_address.last_name}
					</span>
				</p>
			</>
		)
	)
	return (
		<Layout showCartButton="true">
			<Header />
			<div className="z-10 flex justify-center w-full pb-20 bg-white text-navy-600">
				<div
					className="absolute top-0 z-0 object-cover w-full overflow-hidden bg-gradient-to-r from-blue-700 to-blue-800"
					style={{
						height: '50vh',
						minHeight: '380px',
						maxHeight: '420px',
					}}
				/>
				<div className="z-20 flex flex-col items-center w-full space-y-4">
					{!authenticated ? (
						<>
							<h2 className="text-3xl font-semibold text-white">Sign in to your account</h2>
							<div className="flex flex-col items-center w-full px-6 py-6 space-y-3 bg-white border border-gray-300 rounded-lg shadow-lg sm:w-1/3">
								<div className="w-1/2">
									<label htmlFor="username" className="text-sm">
										Username
										<input type="text" className="w-full px-2 py-1 text-base border border-gray-300 rounded-md shadow-sm" id="username" value={login.username} onChange={({ target }) => setLogin({ ...login, username: target.value })} />

									</label>
								</div>
								<div className="w-1/2">
									<label className="text-sm" htmlFor="password">
										Password
										<input className="w-full px-2 py-1 text-base border border-gray-300 rounded-md shadow-sm" type="password" value={login.password} onChange={({ target }) => setLogin({ ...login, password: target.value })} />

									</label>
								</div>
								<div className="w-1/2 pt-4">
									<button type="submit" onClick={handleLogin} className="w-full py-2 text-white transition-colors bg-blue-700 border-2 border-transparent rounded-md hover:text-blue-700 hover:bg-white hover:border-blue-700">Log in</button>

								</div>
							</div>
						</>
					) : (
						<>
							<h2 className="text-3xl font-semibold text-white">
								You&apos;re now logged in
							</h2>
							<div className="flex flex-col w-full px-8 py-6 space-y-3 bg-white border border-gray-300 rounded-lg shadow-lg sm:w-1/3">
								<div className="flex flex-col space-y-1">
									<p className="flex justify-between">
										<span>
											User id
										</span>
										<span>
											{user && user.id}
										</span>
									</p>
									{userDeets}
								</div>
								<div className="pt-4">
									<button type="submit" onClick={handleLogout} className="w-full py-2 text-white transition-colors bg-blue-700 border-2 border-transparent rounded-md hover:text-blue-700 hover:bg-white hover:border-blue-700">
										Log out
									</button>
								</div>
							</div>
							<div className="flex flex-col w-full pt-10 items-between sm:w-1/2">
								<button
									type="button"
									className="mb-4 text-lg font-semibold focus:outline-none"
									onClick={() => setShowOrders((prev) => !prev)}
								>
									{`${showOrders ? '▼ Hide' : '▶ View'}`}
									{' '}
									orders
								</button>
								{showOrders && (
									<>
										<div className="flex justify-between w-full mb-4 font-semibold">
											<div>
												Order
											</div>
											<div>
												Price
											</div>
										</div>
										{userOrders.map((order: UserOrder) => (
											SingleOrder(order)
										))}
									</>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	)
}
