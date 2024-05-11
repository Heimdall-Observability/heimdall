// import { Route } from 'next/dist/server/router';
import { NextRouter } from 'next/router';

import { Icons } from '@/components/icons';
import { User } from '@prisma/client';

declare module 'text-filter';

declare module '*.svg' {
	const content: string;
	export default content;
}

export type NavItem = {
	title: string;
	href: NextRouter<string> | URL;
	disabled?: boolean;
	transitionDelay?: string;
};

export type MainNavItem = NavItem;

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

export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		twitter: NextRouter<string> | URL;
		github: NextRouter<string> | URL;
	};
};

export type DocsConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
	mainNav: MainNavItem[];
};

export type AppConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
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
