/* eslint-disable */
const fetch = require('isomorphic-unfetch')
// const { SiteClient } = require('datocms-client')
// const client = new SiteClient('7cb43e824fe1faf51e0931012e69dd')
const fs = require('fs')
const request = require('request')
// const itemId = '9650724'

let data = []

const download = (url, path, callback) => {
	request.head(url, (err, res, body) => {
		request(url)
			.pipe(fs.createWriteStream(path))
			.on('close', callback)
	})
}

async function getAll() {
	const headers = {
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
	}
	const body = `
	{
		"user_data":  {
			"id": "",
			"currency": "SEK",
			"vat": "inkl.",
			"language": "SV",
			"session_id": ""
		},
		"data": {
			"method": "get_category",
			"params": {
				"category_id": "7",
				"limit": 200,
				"sort": "BeskrFallande",
				"offset": 0
			},
			"appid": "1000",
			"md": "b2db6f14999c5b5cbba7246bd121329c"
		}
	}
	`
 await fetch('http://martenf1.cdsuperstore.se/api/1/', {
	 method: 'POST',
	 headers: headers,
	 body: `POSTDATA=${encodeURI(body)}`,
	 credentials: 'include'
 })
 		.then(res => res.json())
    .then((result) => {
			result.category.article_list.articles.forEach(async (item) => {
				// const smallurl = `http://martenf1.cdsuperstore.se${item.image.small}`
				// const smallfile = item.image.small.split('/')[4].split('?')[0]
				// const smallpath = `./public/images/small/${smallfile}`
				// download(smallurl, smallpath, () => console.log(`done ${smallfile}`))
				const newItem = {
					artnr: item.id, 
					product: item.title,
					descriptionShort: item.short_description,
					cover: item.image.small,
					slug: item.friendly_url === null ? item.title.toLowerCase().replace(' ', '') : item.friendly_url,
				}
				data.push(newItem)
			})
		})
		.then(() => {
			fs.writeFileSync('./admin-tools/searchlist2.json', JSON.stringify(data), (err) => console.error(err))
		})
    .catch(err => console.error(err))
}
getAll()
