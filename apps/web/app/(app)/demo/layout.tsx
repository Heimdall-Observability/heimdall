import { ReactNode } from 'react';

import { DashboardHeader, PublicDashboardHeader } from '@/components/header';
import { dashboardConfig } from '@/config/dashboard';

export default async function layout({ children }: { children: ReactNode }) {
	const user = {
		id: '1',
		name: 'John Doe',
		email: 'john.doe@anonymous.com',
	};
	return (
		<div className='flex min-h-screen flex-col bg-muted'>
			<div className='flex h-full'>
				<main className='flex w-full flex-1 flex-col overflow-hidden space-y-8'>
					<DashboardHeader user={user} items={dashboardConfig.projectNav} />
					<div className='container'>{children}</div>
				</main>
			</div>
		</div>
	);
}
