/* eslint-disable camelcase */
import { UserAuthenticated } from './types'

export const getCartMethod = (
	user: UserAuthenticated,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'get_cart',
		appid: APPID,
		md: MD5,
	},
})

export const updateCartMethod = (
	user: UserAuthenticated,
	product_id: string,
	number: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'update_cart',
		params: {
			product_id,
			number,
			extra: '',
			as_gift: '0',
			wished_length: '',
		},
		appid: APPID,
		md: MD5,
	},
})

export const updateCartPackageMethod = (
	user: UserAuthenticated,
	params: {
		product_id: string
		number: string
		extra: string // e.g. 110-28-66948:1,110-28-98025:1,110-28-73500:2,110-28-73651:1
		as_gift: string
		wished_length: string
	},
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'update_cart',
		params,
		appid: APPID,
		md: MD5,
	},
})

export const getNumberOfArticlesInCartMethod = (
	user: UserAuthenticated,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'get_number_of_articles_in_cart',
		appid: APPID,
		md: MD5,
	},
})

export interface Availibility {
	title: string
	visible: number
	bookable: number
	requestable: number
	min_days: string
	dynamic: number
	product_page: number
	orderable: number
	monitoring: number
	info_text: string
	max_days: string
	id: string
	info_title: string
}

export interface Brand {
	article_list?: any
	name: string
	brands?: any
	id: string
}

export interface Vat {
	vat: string
	description: string
	rate?: any
	id: string
}

export interface Supplier {
	id: string
	name: string
}

export interface ExtraImages {
	1: string
}

export interface Image {
	small: string
	normal: string
	large: string
	extra_images: ExtraImages
}

export interface Campaign {
	name?: any
	id: string
}

export interface Article {
	price_disccount: number
	short_description_owner?: any
	category_id_default?: any
	variation_groups: any[]
	price: number
	availibility_out_of_stock?: any
	description_owner?: any
	create_time: string
	description: string
	availibility: Availibility
	more_info: string
	package_groups: any[]
	properties?: any
	hierarchy_artgrps?: any
	active: number
	parent: string
	rsk?: any
	ean?: any
	brand: Brand
	avg_grade?: any
	campaign_stop_time?: any
	variation_options: any[]
	price_recommended: number
	id: string
	vat: Vat
	variation_articles: any[]
	categories: string[]
	friendly_url: string
	title: string
	supplier: Supplier
	hierarchy_category_names?: any
	package_price_type?: any
	product_supplier_id?: any
	image: Image
	article_prices?: any
	number_of_grades: number
	update_time: string
	campaign: Campaign
	stock: string
	availibility_in_stock?: any
	order_quantity?: any
	type: string
	short_description: string
	url?: any
	category?: any
	campaign_start_time?: any
}

export interface Cartrow {
	sub_session_id: string
	session_id: string
	time: string
	wished_length: string
	extra: string
	number: string
	discount_id: string
	sub_discount_id: string
	as_gift: string
	article: Article
	ab_contacted: string
	id: string
	customer_id: string
	reserved?: any
}

export interface UserData {
	vat: string
	session_id: string
	category_id: string
	contact_id: string
	language: string
	id: string
	type: number
	pass: string
	currency: string
	user: string
}

export interface Cart {
	cartrows: Cartrow[]
	user_data: UserData
}
