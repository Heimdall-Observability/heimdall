'use client';

import { useEffect, useState } from 'react';

import { websitesAtom } from '@/jotai/store';
import { fancyId } from '@/lib/utils';
import { Website as WebsiteType } from '@heimdall-logs/types/models';
import { useAtom } from 'jotai';

import { EmptyPlaceholder } from './empty-placeholder';
import { Website } from './website';
import { WebsiteCreateButton } from './website-create-button';
import { DeleteWebsiteAlert } from './website-delete-alert';
import { EditWebsiteForm } from './website-edit-form';

export default function WebsitesList({
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
		<>
			{websites.length ? (
				<div className='grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
					{websites.map((website) => (
						<Website
							key={fancyId()}
							site={website}
							visitors={website.visitors}
							setSelected={setSelected}
							setIsOpen={setIsOpen}
						/>
					))}
				</div>
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
		</>
	);
}
