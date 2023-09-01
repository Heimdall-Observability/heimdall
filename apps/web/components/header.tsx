'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCallback, useRef } from 'react';

import MobileMenu from '@/components/mobile-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExcludeSquare } from '@phosphor-icons/react';
import { useAnimation } from 'framer-motion';
import { User } from 'next-auth';

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
				...['shadow', 'backdrop-blur-xl', 'bg-white/70', 'dark:bg-gray-900']
			);

			await control.start('visible');
		} else {
			navRef.current?.classList.remove(
				...['shadow', 'backdrop-blur-xl', 'bg-white/70', 'dark:bg-gray-900']
			);
			await control.start('hidden');
		}
	}, [control]);

	return (
		<header className='sticky top-0 z-40 bg-white'>
			<div className='flex h-12 items-center justify-between gap-6 border-b py-0 md:gap-10'>
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
								className='block whitespace-nowrap text-xl font-medium transition focus:outline-none'
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
							<MobileMenu />
						</div>

						<Button variant='outline' className='hidden md:block'>
							<Link href='/login'>Get started</Link>
						</Button>
					</div>
				</nav>
			</div>
		</header>
	);
}

function DashboardHeader() {
	return (
		<header className='sticky top-0 z-40 bg-white'>
			<div className='flex h-12 items-center justify-between gap-6 border-b py-0 md:gap-10'>
				<nav className='fixed inset-x-0 top-0 z-10 w-full p-4 lg:p-2 lg:px-0'>
					<div className='container mx-auto flex justify-between'>
						<div className='flex items-center justify-center gap-2 align-middle'>
							<ExcludeSquare size={32} color='#0074a6' weight='duotone' />
							<Link
								href='/'
								aria-label='almond-ui'
								className='block whitespace-nowrap text-xl font-medium transition focus:outline-none'
							>
								heimdall
							</Link>
						</div>

						<Button variant='outline' className='hidden md:block'>
							<Link href='/login'>Get started</Link>
						</Button>
					</div>
				</nav>
			</div>
		</header>
	);
}

export { SiteHeader, DashboardHeader };
