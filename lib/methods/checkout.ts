export const search_method = (session_id: string, user: string, id: string) => `
{
	"user_data": {
		"pass": "bjJSIIY2YcreY",
		"session_id": ${session_id},
		"vat": "inkl.",
		"language": "SV",
		"currency": "SEK",
		"category_id": "",
		"contact_id": 0,
		"user": ${user},
		"type": "1",
		"id": ${id}
	}
}
`;
