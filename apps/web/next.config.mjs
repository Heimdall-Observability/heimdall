/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from './env.mjs';

const nextConfig = {
  experimental: { serverActions: true },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  siteUrl: env.NEXTAUTH_URL ?? 'https://heimdall.francismasha.com',
  generateRobotsTxt: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  rewrites: async () => [
    {
      destination: env.NEXT_PUBLIC_API_URL,
      source: '/api/heimdall',
    },
  ],
};

export default nextConfig;
