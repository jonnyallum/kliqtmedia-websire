/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kliqtmedia-websire' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/kliqtmedia-websire' : '',
}

module.exports = nextConfig