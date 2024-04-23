/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from './env.mjs';
import million from 'million/compiler';

const nextConfig = {
  experimental: { serverActions: true, instrumentationHook: true },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
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
      source: '/api/heimdall',
      destination: env.NEXT_PUBLIC_API_URL,
    },
    {
      source: '/api/trace',
      destination: env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    },
  ],
  transpilePackages: ['@heimdall-logs/tracker', '@heimdall-logs/api'],
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
};

export default million.next(nextConfig, {
  auto: {
    rsc: true,
    threshold: 0.5,
  },
});
