/* eslint-disable no-tabs */
export const getCategory = (
	id: string,
	limit: number,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_category',
		params: {
			category_id: id,
			limit,
			sort: 'BeskrFallande',
			offset: 0,
		},
		appid: APPID,
		md: MD5,
	},
})

export const getTopOffer = (
	id: string,
	APPID: string,
	MD5: string,
) => `
{
	"data": {
		"method": "get_top_offer",
		"params": {
			"category_id": "${id}",
			"sort": "BeskrFallande"
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`;

export const getArticleList = (
	id: string,
	APPID: string,
	MD5: string,
) => `
{
	"data": {
		"method": "get_article_list_category_toplist",
		"params": {
			"category_id": "${id}"
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`;

export const getFilterSettings = (
	id: string,
	limit: number,
	APPID: string,
	MD5: string,
) => `
{
	"data": {
		"method": "get_filter_settings",
		"params": {
			"category_id": "${id}",
			"limit": ${limit},
			"sort": "BeskrFallande",
			"offset": 0
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`;

export const getFilterSettings1 = (
	id: string,
	limit: number,
	APPID: string,
	MD5: string,
) => `
{
	"data": {
		"method": "get_filter_settings",
		"params": {
			"category_id": "${id}",
			"limit": ${limit},
			"sort": "BeskrFallande",
			"offset": 0,
			"filter_params":{
				"F158":"Bl�"
			}
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`;
