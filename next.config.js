require('dotenv').config()

module.exports = {
  target: 'serverless',
  env: {
    NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN:
      process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
  },
  images: {
    domains: ['datocms-assets.com', 'www.datocms-assets.com', 'https://datocms-assets.com', 'https://www.datocms-assets.com', 'datocms-assets']
  }
}
