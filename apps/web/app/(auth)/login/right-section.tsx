import dynamic from 'next/dynamic';

import { BackLink } from '@/components/arrow-button';
import { Icons } from '@/components/icons';
import { UserAuthForm } from '@/components/user-auth-form';

const CurrentDateDisplay = dynamic(
	() => import('@/components/current-date-display'),
	{ ssr: false }
);
const CurrentTimeDisplay = dynamic(
	() => import('@/components/current-time-display'),
	{ ssr: false }
);

interface Props {
	activeStrategy: {
		github?: boolean;
		google?: boolean;
	};
}

export default function RightSection({ activeStrategy }: Props) {
	return (
		<>
			<BackLink className='absolute md:hidden flex right-8 bottom-8' to='/'>
				back to home
			</BackLink>
			<div className='absolute left-[159px] top-[30px] md:hidden'>
				<div className='absolute left-0 top-0 h-14 w-48'>
					<div className='absolute left-0 top-0 text-2xl font-bold text-gray-900'>
						<CurrentTimeDisplay />
					</div>
					<div className='absolute left-0 top-[40px] text-xs font-medium leading-tight text-slate-500'>
						<CurrentDateDisplay />
					</div>
				</div>

				<div className='absolute left-0 top-[246px] h-52 w-48'>
					<div className='absolute left-0 top-[57.60px] h-40 w-48'>
						<div className='absolute left-0 top-[48px] w-48 text-sm font-medium leading-snug text-slate-500'>
							Web analytics for your business. <br />
							<br />
							Continue For Free.
						</div>
						<h4 className='absolute left-0 top-0 text-3xl font-bold text-gray-900'>
							Heimdall
						</h4>
					</div>
					<div className='absolute left-0 top-0 h-10 w-16'>
						<Icons.logo className='mx-auto h-14 w-14' />
					</div>
				</div>

				<div className='absolute left-0 top-[625px] h-12 w-56'>
					<UserAuthForm activeStrategy={activeStrategy} />
				</div>
			</div>
		</>
	);
}
