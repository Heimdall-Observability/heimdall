import { redirect } from 'next/navigation';

import { ReactNode } from 'react';

import { DashboardHeader } from '@/components/header';
import { SideNav } from '@/components/side-nav';
import { StoreSetter } from '@/components/store-setter';
import { TeamNav } from '@/components/team-nav';
import { dashboardConfig } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';
import { getTeams } from '@/server/query';
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

	const [{ userWebsites, teamWebsites }, teams] = await Promise.all([
		getWebsite(),
		getTeams(),
	]);

	const websites = userWebsites.concat(teamWebsites);

	return (
		<>
			<StoreSetter store='website' data={websites} />
			<StoreSetter store='user' data={user} />
			<StoreSetter store='teamWebsites' data={teamWebsites} />
			<StoreSetter store='userWebsites' data={userWebsites} />
			<StoreSetter store='teams' data={teams} />
			<div className='flex min-h-screen flex-col bg-gray-50'>
				<div className='flex h-full'>
					<TeamNav teams={teams} />
					<main className='flex w-full flex-1 flex-col overflow-hidden'>
						<DashboardHeader user={user} items={dashboardConfig.projectNav} />
						<div className='container'>{children}</div>
					</main>
				</div>
			</div>
		</>
	);
}
