import { redirect } from 'next/navigation';

import { ReactNode } from 'react';

import { DashboardHeader } from '@/components/header';
import { SideNav } from '@/components/side-nav';
import { StoreSetter } from '@/components/store-setter';
import { dashboardConfig } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';
import { getWebsite } from '@/server/query/website';

export const dynamic = 'force-dynamic';

interface DashboardLayoutProps {
	children: ReactNode;
}

export default async function DashboardWebsiteLayout({
	children,
}: DashboardLayoutProps) {
	const user = await getCurrentUser();
	if (!user) {
		return redirect('/login');
	}
	const { userWebsites, teamWebsites } = await getWebsite();
	const websites = userWebsites.concat(teamWebsites);
	return (
		<div className='flex min-h-screen flex-col bg-gray-50'>
			<StoreSetter store='website' data={websites} />
			<StoreSetter store='user' data={user} />
			<StoreSetter store='teamWebsites' data={teamWebsites} />
			<StoreSetter store='userWebsites' data={userWebsites} />
			<div className='flex h-full'>
				<div className='border-scale-500 z-50 hidden h-screen w-14 flex-col justify-between overflow-y-hidden border-r bg-background p-2 md:flex'>
					<SideNav items={dashboardConfig.sidebarNav} />
				</div>
				<main className='flex w-full flex-1 flex-col overflow-hidden'>
					{/*<DashboardHeader />*/}
					<div className='container my-2 grid flex-1 md:my-8'>{children}</div>
				</main>
			</div>
		</div>
	);
}
