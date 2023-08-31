import { ReactNode } from 'react';

import { DashboardHeader } from '@/components/header';
import { SideNav } from '@/components/side-nav';
import { dashboardConfig } from '@/config/dashboard';

export const dynamic = 'force-dynamic';

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function HomeLayout({ children }: DashboardLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col bg-gray-50'>
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
