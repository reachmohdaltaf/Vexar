import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Place allowedDevOrigins at root level, NOT in experimental
  allowedDevOrigins: ['*.localhost:3000', 'localhost:3000'],
  
  experimental: {
    // Remove allowedDevOrigins from here
    serverActions: {
      allowedOrigins: ['*.localhost:3000', 'localhost:3000'],
    },
  },
}

export default nextConfig
