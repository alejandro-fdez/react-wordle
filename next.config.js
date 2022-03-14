/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  i18n,
  env: {
    SUPPORTED_LANGUAGES: ['en', 'es'],
  },
}

module.exports = nextConfig
