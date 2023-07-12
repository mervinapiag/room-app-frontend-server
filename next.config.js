/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bit.ly'],
  },
  env: {
    SOCKET_SERVER_URL : 'http://localhost:3000',
  }
}

module.exports = nextConfig
