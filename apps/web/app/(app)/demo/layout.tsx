import { ReactNode } from 'react';

import { MobileDashboardHeader } from '@/components/header';
import { SideNav } from '@/components/side-nav';
import { dashboardConfig } from '@/config/dashboard';

export default async function layout({ children }: { children: ReactNode }) {
	const user = {
		id: '1',
		name: 'John Doe',
		email: 'john.doe@anonymous.com',
	};

	return (
		<div className='flex min-h-screen flex-col bg-muted/50 pb-12'>
			<div className='flex h-full'>
				<main className='flex w-full flex-1 flex-col space-y-0 overflow-hidden'>
					<MobileDashboardHeader
						user={user}
						items={dashboardConfig.projectNav}
					/>
					<SideNav items={dashboardConfig.sideNav} user={user} />
					<div className='container mt-0'>{children}</div>
				</main>
			</div>
		</div>
	);
}
