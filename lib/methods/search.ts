export const search_method = (
	term: string,
	limit: string,
	APPID: string,
	MD5: string
) => `
{
	"user_data": {
		"id": "",
		"currency": "SEK",
		"vat": "inkl.",
		"language": "SV",
		"session_id": ""
	},
	"data": {
		"method": "search",
		"params": {
			"term": ${term},
			"limit": ${limit},
			"offset": "0"
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
}`