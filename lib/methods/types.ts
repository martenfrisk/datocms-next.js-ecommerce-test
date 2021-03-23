/* eslint-disable camelcase */
export type UserAuthenticated = {
	currency: string
	vat: string
	pass: string
	category_id: string
	contact_id: number
	session_id: string
	type: string
	id: string
	user: string
	language: string
}

export type UserDetails = {
	user_name: string
	pno_extra: string
	mobile_phone: string
	type: string
	register_date: string
	pricelist: string
	fax: string
	vat_no: string
	email: string
	fb_id: string
	evening_phone: string
	delivery_address: {
		country_code: string
		country: string
		day_phone: string
		street_no: string
		city: string
		id: string
		first_name: string
		idx: string
		zip: string
		street_extra: string
		street: string
		last_name: string
		company: string
		state: string
		street_ext: string
	}
	invoice_address: {
		day_phone: string
		country_code: string
		country: string
		id: string
		city: string
		street_no: string
		street_extra: string
		street: string
		last_name: string
		zip: string
		first_name: string
		idx: string
		street_ext: string
		state: string
		company: string
	}
	ext_id: string
	customer_account: string
	subscribed: string
	card_no: string
	pno: string
	id: string
}

export type UserOrder = {
	freight_price_incl_vat: string
	estimated_delivery_time: string
	customer: string
	currency: {
		rate: string
		code: string
	}
	internal_currency: {
		rate: string
		code: string
	}
	notification: {
		price: string
		price_incl_vat: string
		vat: string
		title: string
		id: string
		price_excl_vat: string
	}
	freight: {
		vat: string
		category: string
		title: string
		price_excl_vat: string
		id: string
		price: string
		price_incl_vat: string
	}
	time: string
	vat_amount: string
	payment_vat: string
	payment: {
		price: string
		internal_code: string
		price_excl_vat: string
		id: string
		title: string
		vat: string
		price_incl_vat: string
		psp_name: null
	}
	freight_vat: string
	payment_price_excl_vat: string
	id: string
	extra: string
	total_amount: string
	freight_tracking_number: string
	comment: string
	payment_time: string
	notification_price_excl_vat: string
	total_amount_excl_vat: string
	orderrows: string
	server: string
	payment_price_incl_vat: string
	expected_delivery_time: string
	customer_account: string
	exported: string
	temporary_id: string
	notification_price_incl_vat: string
	language: {
		name: string
		id: string
	}
	orderstatus: {
		id: string
		title: string
	}
	freight_price_excl_vat: string
	notification_vat: string
	days_since_last_order: string
	total_amount_incl_vat: string
	details: any
}
