/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/albums', destination: '/gallery' },
      { source: '/images', destination: '/gallery' },
      { source: '/photos', destination: '/gallery' },
    ];
  },
};

export default nextConfig;

