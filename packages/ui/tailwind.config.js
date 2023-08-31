/** @type {import('tailwindcss').Config} */

const sharedConfig = require('@heimdall/tailwind-config');

module.exports = {
	content: ['./**/*.{js,ts,jsx,tsx,mdx}'],
	presets: [sharedConfig],
};
