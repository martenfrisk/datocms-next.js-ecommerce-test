export const get_menu_method = (
  APPID: string,
  MD5: string
) => `
{
	"data": {
		"method": "get_menu",
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`

export const get_menu_categories_method = (
	id: number,
  APPID: string,
  MD5: string
) => `
{
	"data": {
		"method": "get_menu_categories",
		"params": {
			"category_id": ${id}
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`

export const get_menu_pages_method = (
	id: number,
  APPID: string,
  MD5: string
) => `
{
	"data": {
		"method": "get_menu_pages",
		"params": {
			"menu_id": ${id}
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
`
