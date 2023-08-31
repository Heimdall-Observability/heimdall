import type { ReactNode } from 'react';

import '@heimdall/ui/styles.css';

import Analytics from '../components/analytics';

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<html lang='en'>
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
