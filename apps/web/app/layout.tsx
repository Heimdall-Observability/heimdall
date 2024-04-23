import { Metadata } from 'next';

import type { ReactNode } from 'react';

import { ClientProvider } from '@/components/client-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { fontHeading, fontMono, fontNumeric, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import Heimdall from '@heimdall-logs/tracker/react';

// import '@/styles/syntax-highlighter.module.css';
import Analytics from '../components/analytics';

const title = 'Heimdall';
const description = 'Monitor your app performance.';

export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s | ${title}`,
	},
	description,
	manifest: '/manifest.json',
	keywords: [
		'Monitoring',
		'Open Source app analytics',
		'heimdall',
		'heimdall analytics',
	],
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	viewport: {
		width: 'device-width',
		initialScale: 1,
		userScalable: false,
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	appleWebApp: {
		title,
		capable: true,
		statusBarStyle: 'black-translucent',
		startupImage: ['/apple-touch-icon.png'],
	},
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={cn(
				'min-[100dvh] font-sans text-black',
				fontSans.variable,
				fontHeading.variable,
				fontNumeric.variable,
				fontMono.variable
			)}
		>
			<body className='antialiased'>
				<ClientProvider>
					{children}
					<Heimdall
						config={{
							id: 'heimdall',
							consent: 'granted',
							host: '/api/heimdall',
							collector: '/api/trace',
							// host: 'http://localhost:8000',
							autoTrack: true,
							// env: 'prod',
							// debug: true,
						}}
					/>
					<Toaster />
					<Analytics />
					<TailwindIndicator />
				</ClientProvider>
			</body>
		</html>
	);
}
