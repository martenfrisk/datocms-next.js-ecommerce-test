export const getBrandsMethod = (APPID: string, MD5: string) => ({
	data: {
		method: 'get_brands',
		appid: APPID,
		md: MD5,
	},
});

export const getBrandMethod = (
	id: string,
	limit: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_brand',
		params: {
			brand_id: id,
			limit,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getArticleListBrandToplistMethod = (
	id: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'get_article_list_brand_toplist',
		params: {
			brand_id: id,
		},
		appid: APPID,
		md: MD5,
	},
});
