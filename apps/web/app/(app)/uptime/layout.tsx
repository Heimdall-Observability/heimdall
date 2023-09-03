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
		<>
			<StoreSetter store='website' data={websites} />
			<StoreSetter store='user' data={user} />
			<StoreSetter store='teamWebsites' data={teamWebsites} />
			<StoreSetter store='userWebsites' data={userWebsites} />
			<div className='flex min-h-screen flex-col bg-gray-50'>
				<div className='flex h-full'>
					<SideNav items={dashboardConfig.insightsNav} />
					<main className='flex w-full flex-1 flex-col overflow-hidden'>
						<DashboardHeader user={user} items={dashboardConfig.projectNav} />
						<div className='container'>{children}</div>
					</main>
				</div>
			</div>
		</>
	);
}
