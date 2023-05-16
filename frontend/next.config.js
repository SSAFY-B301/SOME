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
    // loader: "amazon",
    // path: "https://s3.amazonaws.com/image",
    // domains: ["images.unsplash.com"],
    domains: [
      "k8b301-bucket.s3.ap-northeast-2.amazonaws.com",
      "k8b301-k8s-bucket.s3.ap-northeast-2.amazonaws.com",
      "images.unsplash.com",
    ],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "k8b301-bucket.s3.ap-northeast-2.amazonaws.com",
    //   },
    // ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    // ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

// module.exports = {
//   images: {
//     // loader: "amazon",
//     // path: "https://s3.amazonaws.com/image",
//     // domains: ["images.unsplash.com"],
//     domains: ["k8b301-bucket.s3.ap-northeast-2.amazonaws.com"],

//     // remotePatterns: [
//     //   {
//     //     protocol: "https",
//     //     hostname: "k8b301-bucket.s3.ap-northeast-2.amazonaws.com",
//     //   },
//     // ],
//     // remotePatterns: [
//     //   {
//     //     protocol: "https",
//     //     hostname: "images.unsplash.com",
//     //   },
//     // ],
//   },
// };

module.exports = nextConfig;
