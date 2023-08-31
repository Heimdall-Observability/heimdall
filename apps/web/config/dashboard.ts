import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'Uptime',
			href: '/dashboard',
		},
		{
			title: 'Logs',
			href: '/dashboard/logs',
		},
	],
	sidebarNav: [
		{
			title: 'General',
			href: '/dashboard',
			icon: 'monitor',
		},
		{
			title: 'Status',
			href: '/dashboard',
			icon: 'radio',
		},
		{
			title: 'Reports',
			href: '/dashboard',
			icon: 'reports',
		},
		{
			title: 'Notifications',
			href: '/dashboard',
			icon: 'settings',
		},
	],
};
