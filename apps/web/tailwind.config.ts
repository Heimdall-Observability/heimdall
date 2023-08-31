import sharedConfig from '@heimdall/tailwind-config';
import { Config } from 'tailwindcss';

const tailwindConfig = {
	content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
	presets: [sharedConfig],
} satisfies Config;
