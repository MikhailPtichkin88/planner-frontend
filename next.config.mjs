/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  env: {
    SERVER_URL: process.env.SERVER_URL
  }
}

export default nextConfig
