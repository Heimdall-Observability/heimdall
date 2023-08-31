/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./env.mjs');

const nextConfig = {
	experimental: { appDir: true, serverActions: true },
	reactStrictMode: true,
	swcMinify: true,
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
};

export default nextConfig;
