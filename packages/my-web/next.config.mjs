/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.mintdeal.my',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-dev.mintdeal.my',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v3.fal.media',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable transpilation of the mint-ui package for hot-reloading
  transpilePackages: ['@tekminewe/mint-ui'],
  // Configure experimental features for better monorepo support
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
