/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/posts', destination: '/unified' },
      { source: '/news', destination: '/files' },
      { source: '/features', destination: '/unified' },
    ];
  },
};

export default nextConfig;

