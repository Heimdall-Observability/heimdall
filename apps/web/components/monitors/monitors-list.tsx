'use client';

import { useEffect, useState } from 'react';

import { DeleteWebsiteAlert } from '@/components/websites/website-delete-alert';
import { fancyId } from '@/lib/utils';
import { Website as WebsiteType } from '@heimdall-logs/types/models';
import { MoreVertical } from 'lucide-react';

import { EmptyPlaceholder } from '../empty-placeholder';
import { Icons } from '../icons';
import { WebsiteCreateButton } from '../websites/website-create-button';
import { EditWebsiteForm } from '../websites/website-edit-form';

export default function MonitorsList({
	websites,
}: {
	websites: (WebsiteType & { visitors: number })[];
}) {
	const [selected, setSelected] = useState<string>('');
	const [selectedWebsite, setWebsite] = useState<WebsiteType | undefined>(
		undefined
	);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setWebsite(websites.find((website) => website.id === selected));
	}, [selected, websites]);

	return (
		<div className='space-y-2'>
			{websites.length ? (
				websites.map((website) => (
					<div
						key={fancyId()}
						className='cursor-pointer flex bg-card border rounded-xl items-center justify-between px-2 md:px-6 py-3 hover:bg-accent/50'
					>
						<div className='flex cursor-pointer items-center justify-between gap-8'>
							<span className='flex h-3 w-3 translate-y-1 rounded-full bg-lime-500' />
							<div className='grid gap-1'>
								{website.title}
								<div>
									<div>
										<p className='text-xs text-muted-foreground'>
											<span className='text-lime-500'>Up</span> | 8d 2h 3m
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='flex cursor-pointer items-center justify-between gap-8 lg:gap-12'>
							<p className='flex items-center gap-2 text-sm text-slate-400'>
								<Icons.frequency className='h-4 w-4' /> 3m
							</p>
							<MoreVertical
								className='cursor-pointer'
								size={18}
								onClick={() => {
									setIsOpen(true);
									setSelected(website.id);
								}}
							/>
						</div>
					</div>
				))
			) : (
				<EmptyPlaceholder className=' my-4'>
					<EmptyPlaceholder.Icon name='layout' />
					<EmptyPlaceholder.Title>No Website Added</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						You haven&apos;t added any website yet. Start adding website
					</EmptyPlaceholder.Description>
					<WebsiteCreateButton />
				</EmptyPlaceholder>
			)}
			<EditWebsiteForm
				data={selectedWebsite}
				setIsOpen={setIsOpen}
				isOpen={isOpen}
			/>
			<DeleteWebsiteAlert id={selected} />
		</div>
	);
}

// function WebsiteItem(){
//
// }
