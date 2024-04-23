import { Roboto_Mono as FontNumeric, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = localFont({
	src: [
		{
			path: '../assets/fonts/sf-pro-text-regular-webfont.woff2',
			weight: '400',
			style: 'light',
		},
		{
			path: '../assets/fonts/sf-pro-text-regular-webfont.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sf-pro-text-semibold-webfont.woff2',
			weight: '600',
			style: 'semibold',
		},
		{
			path: '../assets/fonts/sf-pro-text-medium-webfont.woff2',
			weight: '600',
			style: 'medium',
		},
		{
			path: '../assets/fonts/sf-pro-text-bold-webfont.woff2',
			weight: '700',
			style: 'bold',
		},
	],
	variable: '--font-sans',
});

// export const fontSans = FontSans({
// 	subsets: ['latin'],
// 	variable: '--font-sans',
// });

// Font files can be collocated inside `pages`
export const fontHeading = localFont({
	src: '../assets/fonts/sf-pro-text-medium-webfont.woff2',
	variable: '--font-heading',
});

export const fontNumeric = FontNumeric({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-numeric',
});

export const fontMono = JetBrains_Mono({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-jetbrains',
});
