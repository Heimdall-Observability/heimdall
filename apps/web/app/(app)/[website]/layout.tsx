import { redirect } from 'next/navigation';

import { ReactNode } from 'react';

import { DashboardHeader } from '@/components/header';
import { dashboardConfig } from '@/config/dashboard';
// import {
// 	DashboardHeader,
// 	PublicDashboardHeader,
// } from '@/components/site-header';
import { getCurrentUser } from '@/lib/session';

export default async function layout({ children }: { children: ReactNode }) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div className='flex min-h-screen flex-col bg-muted/50 pb-12'>
			<div className='flex h-full'>
				<main className='flex w-full flex-1 flex-col overflow-hidden space-y-8'>
					<DashboardHeader user={user} items={dashboardConfig.projectNav} />
					<div className='container'>{children}</div>
				</main>
			</div>
		</div>
	);
}
