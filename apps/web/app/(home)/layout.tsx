import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

interface MarketingLayoutProps {
	children: ReactNode;
}

export default function HomeLayout({ children }: MarketingLayoutProps) {
	return (
		<main className='relative flex min-h-screen flex-col items-center justify-center'>
			{children}
		</main>
	);
}
