require('dotenv').config();
// const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  target: 'serverless',
  images: {
    domains: ['www.datocms-assets.com', 'datocms-assets.com'],
  },
  env: {
    NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN:
      process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
  },
};

module.exports = withBundleAnalyzer(nextConfig)

// module.exports = {
//   webpack(config) {
//     if (process.env.ANALYZE) {
//       config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
//     }

//     return config
//   },
// }
