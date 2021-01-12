/* eslint-disable camelcase */
export type ProductType = {
	productName: string
	slug: string
	subname?: string
	artnr?: string
	rating?: number
	description: string
	descriptionShort: string
	retailPrice: string
	platform: string
	cover: string
	heroimg?: string
}

export type UserReview = {
	grade: string
	time: string
	comment: string
	email: string
	show_email: number
	id: string
	name: string
	customer_id: string
}

export const ItemTypes = {
	PRODUCT: 'product',
}

export type AirProduct = {
	category: string
	rsk: string
	supplier: {
		name: string
		id: string
	}
	variation_options: []
	type: string
	availibility: {
		bookable: number
		title: string
		min_days: string
		info_text: string
		orderable: number
		info_title: string
		monitoring: number
		product_page: number
		max_days: string
		dynamic: number
		id: string
		requestable: number
		visible: number
	}
	package_groups: []
	campaign_start_time: null
	product_supplier_id: null
	active: number
	variation_groups: []
	availibility_out_of_stock: null
	short_description_owner: null
	stock: string
	price_recommended: number
	ean: null
	order_quantity: null
	price_disccount: number
	short_description: string
	hierarchy_category_names: null
	variation_articles: []
	campaign_stop_time: null
	update_time: string
	price: number
	package_price_type: null
	hierarchy_artgrps: null
	description_owner: null
	availibility_in_stock: null
	category_id_default: null
	article_prices: null
	url: null
	title: string
	avg_grade: null
	image: {
		normal: string
		extra_images: {}
		large: string
		small: string
	}
	brand: {
		article_list: null
		name: string
		brands: null
		id: string
	}
	categories: string[]
	vat: {
		rate: null
		description: string
		id: string
		vat: string
	}
	description: string
	friendly_url: string
	number_of_grades: number
	campaign: {
		name: string
		id: string
	}
	properties: null
	parent: string
	create_time: string
	more_info: string
	id: string
}
