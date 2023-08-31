'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as React from 'react';
import { Fragment } from 'react';

import { SidebarNavItem } from '@/types';
import { Button, Icons, cn } from '@heimdall/ui';

interface DashboardNavProps {
	items: SidebarNavItem[];
}

export function SideNav({ items }: DashboardNavProps) {
	const pathname = usePathname();

	if (!items?.length) {
		return null;
	}

	return (
		<Fragment>
			<ul className='flex flex-col space-y-4'>
				<Link href='/' className='hidden items-center md:flex'>
					<Icons.logo />
				</Link>
				{items.map(({ href, disabled, title, icon }, index) => {
					const Icon = Icons[icon || 'arrowRight'];
					return (
						href && (
							<Link
								href={disabled ? '/' : href}
								className={cn(
									'flex items-center font-medium transition-colors hover:text-foreground/80',
									pathname === href ? 'text-foreground' : 'text-foreground/60',
									disabled && 'cursor-not-allowed opacity-80'
								)}
							>
								<Button
									aria-label={title}
									variant='ghost'
									className='h-10 w-10 rounded-md p-0 ring-gray-300 transition-all hover:ring-1 dark:bg-gray-600'
								>
									<Icon className='h-5 w-5 text-gray-600' />
								</Button>
							</Link>
						)
					);
				})}
			</ul>
			<ul className='flex flex-col space-y-2'>
				<Link href='/' className='hidden items-center md:flex'>
					<Icons.logo />
				</Link>
			</ul>
		</Fragment>
	);
}
