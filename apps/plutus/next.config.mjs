import million from 'million/compiler'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

const millionConfig = {
  // auto: true,
  // if you're using RSC:
  auto: { rsc: true, threshold: 0.5, ignore: ['**/node_modules/**'] },
}

const ContentSecurityPolicy = `
    default-src 'self' francismasha.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' plutus.francismasha.com fonts.googleapis.com fonts.gstatic.com *.cloudfront.net assets.lemonsqueezy.com *.googletagmanager.com;
    child-src 'self' francismasha.lemonsqueezy.com;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src * blob: data:;
    media-src 'self';
    connect-src *;
    font-src 'self' fonts.googleapis.com fonts.gstatic.com;
    manifest-src 'self' plutus.francismasha.com;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), autoplay=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
  images: {
    domains: ['www.google.com', 'francismasha.com', 'plutus.francismasha.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default million.next(nextConfig, millionConfig)
