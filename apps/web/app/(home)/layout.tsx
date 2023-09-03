import { ReactNode } from 'react';

import { SiteHeader } from '@/components/header';
import { SiteFooter } from '@/components/site-footer';

export const dynamic = 'force-dynamic';

interface HomeLayoutProps {
	children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<main className='relative flex min-h-screen flex-col items-center justify-center'>
			<SiteHeader />
			{children}
			<SiteFooter className='z-40 mt-12 bg-background' />
		</main>
	);
}
