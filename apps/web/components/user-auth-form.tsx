'use client';

import { useSearchParams } from 'next/navigation';

import { HTMLAttributes, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';

import { Icons } from './icons';

interface Props extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	activeStrategy: {
		github?: boolean;
		google?: boolean;
	};
}

export function UserAuthForm({ className, activeStrategy, ...props }: Props) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
	const searchParams = useSearchParams();
	return (
		<div className={cn('grid gap-4 ', className)} {...props}>
			{activeStrategy.github && (
				<button
					type='button'
					className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
					onClick={() => {
						setIsGitHubLoading(true);
						signIn('github', {
							callbackUrl: searchParams?.get('from') || '/dashboard',
						});
					}}
					aria-disabled={isLoading || isGitHubLoading}
					disabled={isLoading || isGitHubLoading}
				>
					{isGitHubLoading ? (
						<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.gitHub className='mr-2 h-4 w-4' />
					)}
					Github
				</button>
			)}
			{activeStrategy.google && (
				<button
					type='button'
					className={cn(
						buttonVariants({
							variant: 'outline',
							size: 'lg',
						}),
						'bg-card'
					)}
					onClick={() => {
						setIsLoading(true);
						signIn('google', {
							callbackUrl: searchParams?.get('from') || '/dashboard',
						});
					}}
					aria-disabled={isLoading || isGitHubLoading}
					// disabled={isLoading || isGitHubLoading}
				>
					{isLoading ? (
						<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.google className='mr-2 h-4 w-4 dark:fill-white' />
					)}
					Google
				</button>
			)}
		</div>
	);
}
