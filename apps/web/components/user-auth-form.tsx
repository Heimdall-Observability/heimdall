'use client';

import { useSearchParams } from 'next/navigation';

import { HTMLAttributes, useState } from 'react';

import { Icons, buttonVariants, cn } from '@heimdall/ui';
import { signIn } from 'next-auth/react';

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
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
			</div>
			{activeStrategy.github && (
				<button
					type='button'
					className={cn(buttonVariants({ variant: 'outline' }))}
					onClick={() => {
						setIsGitHubLoading(true);
						signIn('github', {
							callbackUrl: searchParams?.get('from') || '/dashboard',
						});
					}}
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
					className={cn(buttonVariants({ variant: 'outline' }))}
					onClick={() => {
						setIsLoading(true);
						signIn('google', {
							callbackUrl: '/dashboard',
						});
					}}
					disabled={isLoading || isGitHubLoading}
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
