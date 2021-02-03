module.exports = {
	ci: {
		collect: {
			startServerCommand: 'npx serve out',
			url: ['http://localhost:5000/'],
			settings: {
				skipAudits: ['uses-http2', 'is-on-https'],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
