/* eslint-disable camelcase */
import { UserAuthenticated } from './types';

export const getArticleMethod = (id: string, APPID: string, MD5: string) => ({
	data: {
		method: 'get_article',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getArticlePropertiesMethod = (
	id: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_article_properties',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getGradesMethod = (
	id: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_grades',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getAvgGradeMethod = (
	id: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_avg_grade',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const addGradeMethod = (
	params: {
    product_id: string;
    grade: string;
    name: string;
    email: string;
    comment: string;
    show_email: string;
  },
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'add_grade',
		params,
		appid: APPID,
		md: MD5,
	},
});

export const getWishlistMethod = (
	user: UserAuthenticated,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'get_wishlist',
		appid: APPID,
		md: MD5,
	},
});

export const addToWishlistMethod = (
	user: UserAuthenticated,
	id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'add_to_wishlist',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const removeFromWishlistMethod = (
	user: UserAuthenticated,
	id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'remove_from_wishlist',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getWatchlistMethod = (
	user: UserAuthenticated,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'get_watchlist',
		appid: APPID,
		md: MD5,
	},
});

export const addToWatchlistMethod = (
	user: UserAuthenticated,
	id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'add_to_watchlist',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const remove_from_watchlist_method = (
	user: UserAuthenticated,
	id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: user,
	data: {
		method: 'remove_from_watchlist',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getArticleListAccessories1Method = (
	id: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_article_list_accessories',
		params: {
			product_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getArticleListAccessories2Method = (
	id: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_article_list_accessories',
		params: {
			product_id: id,
			accessory_list: 2,
		},
		appid: APPID,
		md: MD5,
	},
});
