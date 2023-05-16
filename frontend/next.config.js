/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
});
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "k8b301-bucket.s3.ap-northeast-2.amazonaws.com",
      "images.unsplash.com",
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
