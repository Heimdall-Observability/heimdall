import Link from 'next/link';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Website as WebsiteType } from '@heimdall-logs/types/models';
import { LucideSettings, MoreVertical, User2 } from 'lucide-react';

import { Icons } from './icons';

interface WebsiteProps {
	site: WebsiteType;
	visitors: number;
	key: string;
	setSelected: (id: string) => void;
	setIsOpen: (state: boolean) => void;
}

export function Website({
	site,
	visitors,
	key,
	setSelected,
	setIsOpen,
}: WebsiteProps) {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<Card key={key} className='@container/card shadow-sm rounded-sm'>
			<div className='card__layer1'></div>
			<div className='card__layer2'></div>
			<CardHeader className=''>
				<div className=' flex items-center justify-between'>
					<h3 className='text-lg font-semibold'>{site.title}</h3>
					<MoreVertical
						className='cursor-pointer'
						size={18}
						onClick={() => {
							setIsOpen(true);
							setSelected(site.id);
						}}
					/>
				</div>
				<p className='text-sm text-muted-foreground'>{site.url}</p>
			</CardHeader>
			<CardContent className='flex flex-col @[320px]/card:flex-row @[320px]/card:items-center justify-between gap-2'>
				<div>
					<div className='flex items-center gap-2 text-secondary'>
						<User2 size={20} className=' ' />
						<p className='font-semibold text-sm'>{visitors} Visitors</p>
					</div>
				</div>
				<Link className=' w-full @[320px]/card:w-fit ' href={`/${site.id}`}>
					<Button
						variant='outline'
						className=' w-full @[320px]/card:w-fit'
						onClick={() => {
							setIsLoading(true);
						}}
					>
						{isLoading ? (
							<Icons.spinner className=' h-4 w-4 animate-spin' />
						) : (
							'Go to Dashboard'
						)}
					</Button>
				</Link>
			</CardContent>
		</Card>
	);
}

Website.Skeleton = function WebsiteSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='h-5 w-2/5' />
				<Skeleton className='h-4 w-4/5' />
			</div>
		</div>
	);
};
