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
};

export default nextConfig;
