import { Metadata } from 'next';
import Link from 'next/link';

import { BackLink } from '@/components/arrow-button';
import { Icons } from '@/components/icons';
import { UserAuthForm } from '@/components/user-auth-form';
import { env } from '@/env.mjs';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account',
};

export default function LoginPage() {
	const active = {
		github: !!env.GITHUB_CLIENT_ID,
		google: !!env.GOOGLE_CLIENT_ID,
	};
	return (
		<div className='container  flex h-screen w-screen flex-col items-center justify-center'>
			<BackLink className='absolute left-4 top-4 md:left-8 md:top-8' to='/'>
				back to home
			</BackLink>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]  rounded-md'>
				<div className='flex flex-col items-center'>
					<div className=' mx-auto flex items-end gap-2'>
						<Icons.logo className=' h-10 w-10' />
						<h2 className='text-2xl font-semibold'>Heimdall</h2>
					</div>
				</div>
				<UserAuthForm activeStrategy={active} />
			</div>
		</div>
	);
}
