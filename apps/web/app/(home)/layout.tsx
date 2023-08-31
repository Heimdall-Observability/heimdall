import { ReactNode } from 'react';

import { SiteHeader } from '@/components/header';

export const dynamic = 'force-dynamic';

interface HomeLayoutProps {
	children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<main className='relative flex min-h-screen flex-col items-center justify-center'>
			<SiteHeader />
			{children}
		</main>
	);
}
