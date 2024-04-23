import { NextRouter } from 'next/router';

import { Icons } from '@/components/icons';
import { User } from '@prisma/client';

export type MainNavItem = NavItem;

export type NavLink = {
	title: string;
	href: string;
	disabled?: boolean;
	dynamic?: boolean;
};

export type SidebarNavItem = {
	id: string;
	title: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
} & (
	| {
			href: NextRouter<string> | URL;
			items?: never;
	  }
	| {
			href?: NextRouter<string> | URL;
			items: NavLink[];
	  }
);

export type TeamNavItem = {
	id: string;
	name: string;
	slug: string;
	image?: string;
};

export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		twitter: string;
		github: string;
	};
};

export type DocsConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};
export type DashboardConfig = {
	sideNav: SidebarNavItem[];
	projectNav: MainNavItem[];
	websiteNav: MainNavItem[];
	uptimeNav: SidebarNavItem[];
	insightsNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
	name: string;
	description: string;
	stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
	Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
		stripeCurrentPeriodEnd: number;
		isPro: boolean;
	};
