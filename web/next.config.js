/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'fastly.picsum.photos'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
