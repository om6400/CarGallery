/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev, isServer }) => {
    config.cache = false;
    if (dev && !isServer) {
      config.stats = 'errors-only';
    }
    return config;
  },
};

module.exports = nextConfig;