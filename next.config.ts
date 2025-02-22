/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storys-fishing-app.s3.amazonaws.com'],
  },
  webpack: (config) => {
    config.cache = {
      type: "memory",
    };
    return config;
  },
};

module.exports = nextConfig;
