/** @type {import('next').NextConfig} */
const nextConfig = {
basePath: '/planner_app',
  env: {
    SERVER_URL: process.env.SERVER_URL
  }
}

export default nextConfig
