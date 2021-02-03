/* eslint-disable no-console */
import 'isomorphic-unfetch';
import md5 from 'blueimp-md5';

import {
	addGradeMethod,
	addToWishlistMethod,
	getArticleMethod,
	getAvgGradeMethod,
	getGradesMethod,
	getWishlistMethod,
	removeFromWishlistMethod,
} from './methods/articles'
import {
	getCustomerMethod,
	getOrderMethod,
	getOrdersMethod,
	loginMethod,
} from './methods/customer';
import { UserAuthenticated } from './methods/types';
import { getCategory, getTopOfferMethod } from './methods/category';
import { AirProduct } from './types';

const appKey = 'wyD4oDd3oyT6iT7N';
const appId = '1000';
const API_URL = 'http://martenf1.cdsuperstore.se/api/1/'

function getMd(dataMethod: string, ...input: any[]) {
	const md5string = `${appKey},${dataMethod}${input.length > 0 ? `,${input.join(',')}` : ''}`;
	const md = md5(md5string);
	return md;
}

async function fetchAPI(bodyData: any, proxy: boolean = true) {
	const url = proxy ? 'http://martenf1.cdsuperstore.se/apiproxy/' : API_URL
	const headers = new Headers({
		Accept: 'application/json, text/javascript, */*',
		'Accept-Language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7,no;q=0.6',
		Authorization: 'Basic QWRtaW5pc3RyYXRvcjo0dUNAeUZHRnVz',
		'Cache-Control': 'no-cache',
		'Content-Type': 'application/x-www-form-urlencoded',
		Pragma: 'no-cache',
		Connection: 'keep-alive',
		Host: 'martenf1.cdsuperstore.se',
		'X-Requested-With': 'XMLHttpRequest',
		Origin: 'http://martenf1.cdsuperstore.se',
		Referer: 'http://martenf1.cdsuperstore.se/api_test/index.html',
		'Referrer-Policy': 'unsafe-url',
	})
	const res = await fetch(url, {
		method: 'POST',
		headers,
		// mode: 'cors',
		body: `POSTDATA=${encodeURI(JSON.stringify(bodyData))}`,
		// redirect: 'follow',
		credentials: 'include',
	})
	const json = await res.json()
	if (json.errors) {
		// eslint-disable-next-line no-console
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}
	return json
}

export async function getAllProducts(limit: number = 30, category: string = '7') {
	const brandmd = getMd('get_category', category, limit, '0', 'BeskrFallande')
	const brandbody = getCategory(category, limit, appId, brandmd)
	const data = await fetchAPI(brandbody, true)
	const products = []
	data.category.article_list.articles.forEach(async (x: AirProduct) => {
		const newObj = {
			productName: x.title,
			artnr: x.id,
			slug: x.friendly_url === null ? x.title.toLowerCase().replace(' ', '') : x.friendly_url,
			description: x.description,
			descriptionShort: x.short_description,
			retailPrice: x.price,
			cover: x.image.normal.split('/')[3].split('?')[0].split('.')[0],
			heroimg: x.image.normal.split('/')[3].split('?')[0].split('.')[0],
			platform: x.categories,
		}
		products.push(newObj)
	})
	return products
}
export async function getTopOffer(category: string = '7') {
	const brandmd = getMd('get_top_offer', category, 'BeskrFallande')
	const brandbody = getTopOfferMethod(category, appId, brandmd)
	const data = await fetchAPI(brandbody, true)
	const product = {
		productName: data.article_list.articles[0].title,
		artnr: data.article_list.articles[0].id,
		slug: data.article_list.articles[0].friendly_url === null ? data.article_list.articles[0].title.toLowerCase().replace(' ', '') : data.article_list.articles[0].friendly_url,
		description: data.article_list.articles[0].description,
		descriptionShort: data.article_list.articles[0].short_description,
		retailPrice: data.article_list.articles[0].price,
		cover: data.article_list.articles[0].image.normal.split('/')[3].split('?')[0].split('.')[0],
		heroimg: data.article_list.articles[0].image.extra_images['2'].split('/')[4].split('?')[0].split('.')[0],
		platform: data.article_list.articles[0].categories,
	}
	return product
}

export async function getProductByArtnr(artnr: string) {
	const prodmd = getMd('get_article', artnr)
	const prodbody = getArticleMethod(artnr, appId, prodmd)
	const data = await fetchAPI(prodbody)
	let product: any
	if (data) {
		product = {
			productName: data.article.title,
			artnr: data.article.id,
			slug: data.article.friendly_url === null ? data.article.title.toLowerCase().replace(' ', '') : data.article.friendly_url,
			description: data.article.description,
			descriptionShort: data.article.short_description,
			retailPrice: data.article.price.toString(),
			cover: data.article.image.normal.split('/')[3].split('?')[0].split('.')[0],
			platform: data.article.categories,
			rating: data.article.avg_grade,
		}
	}
	return product
}

export async function loginUser(username: string, password: string) {
	const loginMd = getMd('login', password, username)
	const loginBody = loginMethod(username, password, appId, loginMd)
	const data = await fetchAPI(loginBody, true)
	return data
}

export async function getCustomer(pass: string, session: string, user: string, id: string) {
	const customerMd = getMd('get_customer')
	const customerBody = getCustomerMethod(pass, session, user, id, appId, customerMd)
	const data = await fetchAPI(customerBody, true)
	return data
}

export async function getOrders(pass: string, session: string, user: string, id: string) {
	const ordersMd = getMd('get_orders')
	const ordersBody = getOrdersMethod(pass, session, user, id, appId, ordersMd)
	const data = await fetchAPI(ordersBody, true)
	return data
}

export async function getGradeFromId(productId: string) {
	const gradeMd = getMd('get_avg_grade', productId)
	const gradeBody = getAvgGradeMethod(productId, appId, gradeMd)
	const data = await fetchAPI(gradeBody)
	return data
}

export async function addNewReview(
	productId: string,
	grade: string,
	userName: string,
	email: string,
	comment: string,
	emailBoolean: boolean,
) {
	const showEmail = emailBoolean ? 'yes' : 'no'
	const gradeMd = getMd('add_grade', comment, email, grade, userName, productId, showEmail)
	const params = {
		product_id: productId,
		grade,
		name: userName,
		email,
		comment,
		show_email: showEmail,
	}
	const gradeBody = addGradeMethod(
		params,
		appId,
		gradeMd,
	)
	const data = await fetchAPI(gradeBody, true)
	return data
}
export async function addToWishlist(
	productId: string,
	user: UserAuthenticated,
) {
	const wishMd = getMd('add_to_wishlist', productId)
	const wishBody = addToWishlistMethod(
		user,
		productId,
		appId,
		wishMd,
	)
	const data = await fetchAPI(wishBody, true)
	return data.method_status.status
}

export async function removeFromWishlist(
	productId: string,
	user: UserAuthenticated,
) {
	const wishMd = getMd('remove_from_wishlist', productId)
	const wishBody = removeFromWishlistMethod(
		user,
		productId,
		appId,
		wishMd,
	)
	const data = await fetchAPI(wishBody, true)
	return data.method_status.status
}

export async function getWishlist(
	user: UserAuthenticated,
) {
	const wishMd = getMd('get_wishlist')
	const wishBody = getWishlistMethod(
		user,
		appId,
		wishMd,
	)
	const data = await fetchAPI(wishBody, true)
	return data.wishlist
}

export async function getReviewsByProductId(productId: string) {
	const reviewMd = getMd('get_grades', productId)
	const reviewBody = getGradesMethod(productId, appId, reviewMd)
	const data = await fetchAPI(reviewBody)
	return data
}

export async function getOrder(
	pass: string,
	session: string,
	user: string,
	id: string,
	orderId: string,
) {
	const ordersMd = getMd('get_order', orderId)
	const ordersBody = getOrderMethod(pass, session, user, id, orderId, appId, ordersMd)
	const data = await fetchAPI(ordersBody, true)
	return data
}
