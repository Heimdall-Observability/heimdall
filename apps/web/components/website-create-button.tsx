'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { userWebsitesAtom, websiteFormAtom } from '@/jotai/store';
import { useAtom } from 'jotai';

import { Icons } from './icons';

export function WebsiteCreateButton({ variant, ...props }: ButtonProps) {
	const [websites] = useAtom(userWebsitesAtom);
	const [, setCreateWebsite] = useAtom(websiteFormAtom);

	async function onClick() {
		if (websites.length > 1) {
			return toast({
				title: 'Limit of 2 websites reached.',
				description: 'We currently only support 2 websites per account.',
				variant: 'destructive',
			});
		}
		setCreateWebsite(true);
	}

	return (
		<Button onClick={onClick} {...props}>
			<Icons.add className='h-4 w-4 ' />
			<span className=''>New Website</span>
		</Button>
	);
}
