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
  turbopack: {
    root: '/Users/tekminewe/Documents/Github/my-workspace',
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      '@tekminewe/mint-ui': '../mint-ui/dist',
    },
  },
};

export default nextConfig;
