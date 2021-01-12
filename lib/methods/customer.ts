/* eslint-disable camelcase */
export const loginMethod = (
	username: string,
	password: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'login',
		params: {
			username,
			password,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getCustomerMethod = (
	pass: string,
	session_id: string,
	user: string,
	id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		pass,
		session_id,
		vat: 'inkl.',
		language: 'SV',
		currency: 'SEK',
		category_id: '',
		user,
		contact_id: 0,
		type: '1',
		id,
	},
	data: {
		method: 'get_customer',
		appid: APPID,
		md: MD5,
	},
});

export const addCustomerMethod = (
	email: string,
	password: string,
	APPID: string,
	MD5: string,
) => ({
	data: {
		method: 'add_customer',
		params: {
			email,
			password,
		},
		appid: APPID,
		md: MD5,
	},
});

export const updateCustomerMethod = (
	pass: string,
	session_id: string,
	user: string,
	id: string,
	first_name: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		pass,
		session_id,
		vat: 'inkl.',
		language: 'SV',
		currency: 'SEK',
		category_id: '',
		user,
		contact_id: 0,
		type: '1',
		id,
	},
	data: {
		method: 'update_customer',
		params: {
			first_name,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getCustomerFieldsMethod = (
	session_id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		id: '',
		currency: 'SEK',
		vat: 'inkl.',
		language: 'SV',
		session_id,
	},
	data: {
		method: 'get_customer_fields',
		params: {
			type: '0',
		},
		appid: APPID,
		md: MD5,
	},
});

export const resetPasswordRequestMethod = (
	session_id: string,
	email: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		id: '',
		currency: 'SEK',
		vat: 'inkl.',
		language: 'SV',
		session_id,
	},
	data: {
		method: 'reset_password_request',
		params: {
			email,
		},
		appid: APPID,
		md: MD5,
	},
});

export const resetPasswordMethod = (
	customer_id: string,
	sequrity_code: string,
	password: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		id: '',
		currency: 'SEK',
		vat: 'inkl.',
		language: 'SV',
		session_id: '',
	},
	data: {
		method: 'reset_password',
		params: {
			customer_id,
			sequrity_code,
			password,
		},
		appid: APPID,
		md: MD5,
	},
});

export const getOrdersMethod = (
	pass: string,
	session_id: string,
	user: string,
	id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		pass,
		session_id,
		vat: 'inkl.',
		language: 'SV',
		currency: 'SEK',
		category_id: '',
		user,
		contact_id: 0,
		type: '1',
		id,
	},
	data: {
		method: 'get_orders',
		appid: APPID,
		md: MD5,
	},
});

export const getOrderMethod = (
	pass: string,
	session_id: string,
	user: string,
	id: string,
	order_id: string,
	APPID: string,
	MD5: string,
) => ({
	user_data: {
		pass,
		session_id,
		vat: 'inkl.',
		language: 'SV',
		currency: 'SEK',
		category_id: '',
		user,
		contact_id: 0,
		type: '1',
		id,
	},
	data: {
		method: 'get_order',
		params: {
			order_id,
		},
		appid: APPID,
		md: MD5,
	},
});
