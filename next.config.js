/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL || 'http://localhost:3000'
  }
}
