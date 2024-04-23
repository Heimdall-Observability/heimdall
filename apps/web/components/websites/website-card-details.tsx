import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getFavicon } from '@/lib/utils';
import { Website as WebsiteType } from '@heimdall-logs/types/models';
import { User2 } from 'lucide-react';

import logo from '../../public/android-chrome-512x512.png';

interface WebsiteProps {
	site: WebsiteType;
	visitors: number;
	setSelected: (id: string) => void;
	setIsOpen: (state: boolean) => void;
}

export function WebsiteCardDetails({
	site,
	visitors,
	setSelected,
	setIsOpen,
}: WebsiteProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [favicon, setFavicon] = useState('');
	// const favicon = getFavicon(site.url).then((favicon) => {
	// 	return favicon;
	// });

	useEffect(() => {
		getFavicon(site.url).then((favicon) => {
			setFavicon(favicon);
		});
	}, []);

	return (
		<Link href={`/s/${site.id}`}>
			<Card className='rounded-xl shadow-none hover:shadow-md'>
				<CardHeader className='p-4 md:p-6 md:pb-3 flex justify-between flex-row'>
					<div className='flex items-center gap-2'>
						<Image
							src={favicon || logo}
							alt='...'
							height={32}
							width={32}
							className='border rounded-full shrink p-0.5'
						/>
						<div className=''>
							<CardTitle className='text-base font-normal'>
								{site.title}
							</CardTitle>
							<p className='text-xs text-muted-foreground truncate'>
								{site.url}
							</p>
						</div>
					</div>
					<div className='flex items-center justify-center border-2 border-secondary rounded-full h-8 w-8'>
						<span className='text-xs font-light'>100</span>
					</div>
				</CardHeader>
				<CardContent className='flex justify-between gap-2 p-4 pt-0 md:p-6 md:pt-3'>
					<div className='flex items-center gap-2 text-lime-500'>
						<User2 size={20} />
						<p className='text-xs slashed-zero'>
							{visitors}{' '}
							<span className='hidden md:inline-block'>Visitors</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

WebsiteCardDetails.Skeleton = function WebsiteSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='h-5 w-2/5' />
				<Skeleton className='h-4 w-4/5' />
			</div>
		</div>
	);
};
