const withPreact = require('next-plugin-preact');

module.exports = withPreact({
	basePath: process.env.NODE_ENV === 'production' ? '/out' : '',
});
