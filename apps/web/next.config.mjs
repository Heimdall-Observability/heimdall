const nextConfig = {
  logging: {
    level: 'verbose',
    fullUrl: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: [
      'libsql',
      // "@libsql/client",
      // "better-sqlite3"
    ],
    optimizePackageImports: ['@tremor/react'],
    // FIXME: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    // TODO: https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
    // TODO: https://nextjs.org/docs/messages/deopted-into-client-rendering
    missingSuspenseWithCSRBailout: false,
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
      source: '/api/trace',
      destination: 'http://localhost:4318/v1/traces',
    },
    {
      source: '/api/heimdall',
      destination: 'http://localhost:8000',
    },
    {
      source: '/api/heimdall/:path*',
      destination: `http://localhost:8000/:path*`,
    },
    // {
    //   source: '/api/heimdall',
    //   destination: env.NEXT_PUBLIC_API_URL,
    // },
    // {
    //   source: '/api/trace',
    //   destination: env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    // },
    {
      source: '/api/openstatus',
      destination: 'https://vitals.openstat.us/',
    },
  ],
  transpilePackages: ['@heimdall-logs/tracker', '@heimdall-logs/api'],
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
}

export default nextConfig
