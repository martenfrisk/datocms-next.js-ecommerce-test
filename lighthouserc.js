module.exports = {
	ci: {
		collect: {
			startServerCommand: 'npx serve out',
			url: ['http://localhost:5000/'],
			settings: {
				skipAudits: ['uses-http2', 'is-on-https'],
			},
			chromeFlags: '--no-sandbox',
			startServerReadyPattern: 'Serving!',
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
