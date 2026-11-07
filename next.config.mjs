/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";

import withPWA from "next-pwa";

const nextPWA = withPWA({
  dest: "public",
  disable: !isProduction,
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = nextPWA({
  reactStrictMode: false,
  compiler: {
    removeConsole: isProduction,
  },
  images: {
    dangerouslyAllowSVG: true,
  },
  env: {
    APP_ENV: process.env.APP_ENV,

    // API
    APP_API_KEY: process.env.API_KEY,
    APP_API_BASE_URL: process.env.API_BASE_URL,

    // COOKIE & HOSTNAME
    APP_COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    APP_HOSTNAME_DOMAIN: process.env.HOSTNAME_DOMAIN,

    // SIGNATURE
    APP_SIGNATURE_IV: process.env.SIGNATURE_IV,
    APP_SIGNATURE_KEY: process.env.SIGNATURE_KEY,

    // ENCRYPTION
    APP_ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
});

export default nextConfig;
