import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
	sideNav: [
		{
			id: 'website',
			title: 'Website',
			href: '/dashboard',
			icon: 'monitor',
		},
		{
			id: 'monitors',
			title: 'Monitors',
			href: '/monitors',
			icon: 'frequency',
		},
		{
			id: 'status',
			title: 'Status',
			href: '/status',
			icon: 'radio',
		},
		{
			id: 'api-keys',
			title: 'Security',
			href: '/api-keys',
			icon: 'key',
		},
		{
			id: 'teams',
			title: 'Teams',
			href: '/dashboard/team',
			icon: 'users',
		},
		// {
		// 	id: 'reports',
		// 	title: 'Reports',
		// 	href: '/dashboard/reports',
		// 	icon: 'reports',
		// },
		// {
		// 	id: 'settings',
		// 	title: 'Notifications',
		// 	href: '/dashboard/notification',
		// 	icon: 'settings',
		// },
	],
	projectNav: [
		{
			title: 'Overview',
			href: '/logs',
		},
		{
			title: 'Monitoring',
			href: '/monitoring',
		},
		{
			title: 'Api-Keys',
			href: '/api-keys',
		},
		{
			title: 'Settings',
			href: '/insights',
		},
	],
	websiteNav: [
		{
			title: 'Overview',
			href: '/logs',
		},
		{
			title: 'Uptime',
			href: '/uptime',
		},
		{
			title: 'Insights',
			href: '/insights',
		},
		{
			title: 'Logs',
			href: '/logs',
		},
	],
	uptimeNav: [
		{
			id: 'website',
			title: 'Website',
			href: '/dashboard',
			icon: 'monitor',
		},
		{
			id: 'status',
			title: 'Status',
			href: '/dashboard/status',
			icon: 'radio',
		},
		{
			id: 'reports',
			title: 'Reports',
			href: '/dashboard/reports',
			icon: 'reports',
		},
		{
			id: 'settings',
			title: 'Notifications',
			href: '/dashboard/notification',
			icon: 'settings',
		},
	],
	insightsNav: [
		{
			id: 'website',
			title: 'Website',
			href: '/dashboard',
			icon: 'monitor',
		},
		{
			id: 'status',
			title: 'Status',
			href: '/dashboard/status',
			icon: 'radio',
		},
		{
			id: 'reports',
			title: 'Reports',
			href: '/dashboard/reports',
			icon: 'reports',
		},
		{
			id: 'settings',
			title: 'Notifications',
			href: '/dashboard/notification',
			icon: 'settings',
		},
	],
};
