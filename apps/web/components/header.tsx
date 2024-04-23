'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

import { BackLink } from '@/components/arrow-button';
import MobileMenu from '@/components/mobile-menu';
import { buttonVariants } from '@/components/ui/button';
import { UserAccountNav } from '@/components/user-account-nav';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';
import { ExcludeSquare } from '@phosphor-icons/react';
import { User } from 'next-auth';

interface MiniHeaderProps {
	heading: string;
	text?: string;
	children?: ReactNode;
}

interface DashboardHeaderProps {
	items: MainNavItem[];
	user: User;
	className?: string;
}

interface Props {
	className?: string;
	user?: User;
}

const LINKS = [
	// { name: 'Pricing', href: '/pricing' },
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

function SiteHeader({ user, className }: Props) {
	return (
		<header
			className={cn(
				'flex w-full items-center justify-between gap-2',
				className
			)}
		>
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

			<div className='hidden md:flex'>
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
		</header>
	);
}

function DashboardHeader({ user, items, className }: DashboardHeaderProps) {
	return (
		<header
			className={cn(
				'flex w-full items-center justify-between gap-2',
				className
			)}
		>
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
				<MobileMenu user={user} />
			</div>

			<div className='hidden md:flex'>
				<UserAccountNav user={user} />
			</div>
		</header>
	);
}

function MiniHeader({ heading, text, children }: MiniHeaderProps) {
	return (
		<div className='flex items-center justify-between px-2'>
			<div className='grid gap-1'>
				<h1 className='bg-clip-text text-xl font-extrabold tracking-tight md:text-2xl'>
					{heading}
				</h1>
				{text && <p className='text-sm text-muted-foreground'>{text}</p>}
			</div>
			{children}
		</div>
	);
}

function PublicDashboardHeader() {
	return (
		<header className='mt-4 flex items-center justify-between border-b pb-4 dark:border-gray-800'>
			<ExcludeSquare size={32} color='#0074a6' weight='duotone' />
			<Link
				href='/'
				aria-label='almond-ui'
				className='block whitespace-nowrap text-lg font-semibold transition focus:outline-none'
			>
				heimdall
			</Link>
			<div className='flex items-center gap-2 font-medium'>
				<div className='relative col-span-1 select-none flex-col items-center justify-center self-center lg:flex'></div>
			</div>
		</header>
	);
}

function MobileDashboardHeader({
	user,
	items,
	className,
}: DashboardHeaderProps) {
	return (
		<header
			className={cn(
				'flex w-full items-center justify-between gap-2 md:hidden p-4',
				className
			)}
		>
			<div className='flex items-center justify-center gap-2 align-middle'>
				<BackLink className='' to='/'>
					back to home
				</BackLink>
			</div>

			<div className=''>
				<UserAccountNav user={user} />
			</div>
		</header>
	);
}

export {
	SiteHeader,
	DashboardHeader,
	MiniHeader,
	PublicDashboardHeader,
	MobileDashboardHeader,
};
