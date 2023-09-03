import { redirect } from 'next/navigation';

import { ReactNode } from 'react';

import { GenerateApiKey } from '@/components/api-key-generate-modal';
import { DashboardHeader, MiniHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { SideNav } from '@/components/side-nav';
import { dashboardConfig } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';
import { getWebsite } from '@/server/query/website';

export default async function APIKeysLayout({
	children,
}: {
	children: ReactNode;
}) {
	const user = await getCurrentUser();
	if (!user) {
		return redirect('/login');
	}

	const { userWebsites, teamWebsites } = await getWebsite();
	const websites = userWebsites.concat(teamWebsites);

	return (
		<div className='flex min-h-screen flex-col bg-gray-50'>
			<div className='flex h-full'>
				<main className='flex w-full flex-1 flex-col overflow-hidden'>
					<DashboardHeader user={user} items={dashboardConfig.projectNav} />
					<div className='container'>
						<DashboardShell>
							<MiniHeader heading='API Keys' text='Manage your api keys.'>
								<GenerateApiKey websites={websites} />
							</MiniHeader>
							{children}
						</DashboardShell>
					</div>
				</main>
			</div>
		</div>
	);
}
