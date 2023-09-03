'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { BackLink, NextLink } from '@/components/arrow-button';
import ExpandingArrow from '@/components/expanding-arrow';
import MobileMenu from '@/components/mobile-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { UserAccountNav } from '@/components/user-account-nav';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';
import { ExcludeSquare } from '@phosphor-icons/react';
import { useAnimation } from 'framer-motion';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

interface MiniHeaderProps {
	heading: string;
	text?: string;
	children?: ReactNode;
}

interface DashboardHeaderProps {
	items: MainNavItem[];
	user: User;
	showOrgSelect?: boolean;
	showLogo?: boolean;
}

const LINKS = [
	{ name: 'Pricing', href: '/pricing' },
	{ name: 'Changelog', href: '/changelog' },
	{ name: 'Docs', href: '/docs' },
];

function NavItem({ href, text }: { href: string; text: string }) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<li>
			<Link
				href={href}
				className={cn(
					isActive
						? 'font-semibold text-gray-800 dark:text-gray-100'
						: 'font-normal text-gray-600 dark:text-gray-300',
					'underlined mx-3 hidden px-1 text-sm transition-all md:inline-block'
				)}
			>
				{text}
			</Link>
		</li>
	);
}

function SiteHeader({ user }: { user?: User }) {
	const navRef = useRef<HTMLDivElement>(null);
	const control = useAnimation();

	const addShadowToNavbar = useCallback(async () => {
		if (window.pageYOffset > 10) {
			navRef.current?.classList.add(
				...['border-b', 'backdrop-blur-xl', 'bg-white/70', 'dark:bg-gray-900']
			);

			await control.start('visible');
		} else {
			navRef.current?.classList.remove(
				...['border-b', 'backdrop-blur-xl', 'bg-white/70', 'dark:bg-gray-900']
			);
			await control.start('hidden');
		}
	}, [control]);

	useEffect(() => {
		window.addEventListener('scroll', addShadowToNavbar);
		return () => {
			window.removeEventListener('scroll', addShadowToNavbar);
		};
	}, [addShadowToNavbar]);

	return (
		<header className='flex h-12 items-center justify-between gap-6 border-b py-0 md:gap-10'>
			<nav
				ref={navRef}
				className='fixed inset-x-0 top-0 z-10 w-full p-4 lg:p-2 lg:px-0'
			>
				<div className='container mx-auto flex justify-between'>
					<div className='flex items-center justify-center gap-2 align-middle'>
						<ExcludeSquare size={32} color='#0074a6' weight='duotone' />
						<Link
							href='/'
							aria-label='almond-ui'
							className='block whitespace-nowrap text-lg font-semibold transition focus:outline-none'
						>
							heimdall
						</Link>
					</div>

					<div className='ml-[-0.60rem] lg:flex lg:items-center lg:justify-center'>
						<ul className='hidden lg:flex'>
							{LINKS.map((link) => (
								<NavItem key={link.href} href={link.href} text={link.name} />
							))}
						</ul>
						<MobileMenu user={user} />
					</div>

					<div className='md:flex hidden'>
						{user ? (
							<UserAccountNav user={user} />
						) : (
							<Link
								href='/login'
								className={cn(
									buttonVariants({ variant: 'ghost' }),
									'hover:bg-primary/10 hover:text-primary'
								)}
							>
								Login
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}

function DashboardHeader({ user, items }: DashboardHeaderProps) {
	return (
		<header className='sticky top-0 z-40 bg-white'>
			<div className='flex h-12 items-center justify-between gap-6 border-b py-0 md:gap-10'>
				<nav className='fixed inset-x-0 top-0 z-10 w-full p-4 lg:p-2 lg:px-0'>
					<div className='mx-8 flex justify-between'>
						<div className='flex items-center justify-center gap-2 align-middle'>
							<Link
								href='/'
								aria-label='heimdall-home'
								className='block whitespace-nowrap text-xl font-medium transition focus:outline-none'
							>
								<ExcludeSquare size={32} color='#0074a6' weight='duotone' />
							</Link>
						</div>

						<div className='ml-[-0.60rem] lg:flex lg:items-center lg:justify-center'>
							<ul className='hidden lg:flex'>
								{items.map((link) => (
									<NavItem key={link.href} href={link.href} text={link.title} />
								))}
							</ul>
							<MobileMenu />
						</div>

						<UserAccountNav user={user} />
					</div>
				</nav>
			</div>
		</header>
	);
}

function MiniHeader({ heading, text, children }: MiniHeaderProps) {
	return (
		<div className='flex items-center justify-between px-2'>
			<div className='grid gap-1'>
				<h1 className='bg-clip-text tracking-tight text-xl font-extrabold md:text-2xl'>
					{heading}
				</h1>
				{text && <p className='text-muted-foreground text-sm'>{text}</p>}
			</div>
			{children}
		</div>
	);
}

export { SiteHeader, DashboardHeader, MiniHeader };
