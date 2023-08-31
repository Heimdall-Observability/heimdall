import type { ReactNode } from 'react';

import '@heimdall/ui/styles.css';

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
