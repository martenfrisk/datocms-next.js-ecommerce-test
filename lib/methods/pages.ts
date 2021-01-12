export const get_page_method = (
  page_id: number,
  APPID: string,
  MD5: string
) => `
{
	"user_data": {
		"id": "",
		"currency": "SEK",
		"vat": "inkl.",
		"language": "SV",
		"session_id": "APIdfzemVsUxnxyl54t5UE7p7MHBp0"
	},
	"data": {
		"method": "get_page",
		"params": {
			"page_id": ${page_id}
		},
		"appid": "${APPID}",
		"md": "${MD5}"
	}
}
`;
