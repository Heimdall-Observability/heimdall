import { ReactNode } from 'react';

import { SiteHeader } from '@/components/header';
import { SiteFooter } from '@/components/site-footer';
import { getCurrentUser } from '@/lib/session';

export const dynamic = 'force-dynamic';

interface HomeLayoutProps {
	children: ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
	const user = await getCurrentUser();
	return (
		<main className='relative flex min-h-screen flex-col items-center justify-center'>
			<SiteHeader user={user} />
			{children}
			<SiteFooter className='z-40 mt-6 md:mt-12 bg-background' />
		</main>
	);
}
