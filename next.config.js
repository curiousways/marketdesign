/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  env: {
    SITE_URL: "site url",
    SITE_TITLE: "Market Design",
    GOOGLE_ANALYTICS_ID: "yourgaid",
    FATHOM_ANALYTICS_ID: "yourfathomanalyticsid",
  },
  images: {
    deviceSizes: [400, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

module.exports = nextConfig;
