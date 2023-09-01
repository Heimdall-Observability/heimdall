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
			title: 'Website',
			href: '/dashboard',
			icon: 'monitor',
		},
		{
			title: 'Status',
			href: '/dashboard/status',
			icon: 'radio',
		},
		{
			title: 'Reports',
			href: '/dashboard/reports',
			icon: 'reports',
		},
		{
			title: 'Notifications',
			href: '/dashboard/notification',
			icon: 'settings',
		},
	],
};
