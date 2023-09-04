import { Suspense } from 'react';

import { CardSkeleton } from '@/components/card-skeleton';
import { DashboardHeader, MiniHeader } from '@/components/header';
import Search from '@/components/search';
import { DashboardShell } from '@/components/shell';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebsiteCreateButton } from '@/components/website-create-button';
import { WebsiteForm } from '@/components/website-create-form';
import WebsitesList from '@/components/websites-list';
import { getWebsite } from '@/server/query/website';
import { LayoutGrid, List } from 'lucide-react';

export default async function DashboardPage() {
	const { userWebsites, teamWebsites } = await getWebsite();
	const websites = userWebsites.concat(teamWebsites);

	return (
		<DashboardShell>
			<Tabs defaultValue='card' className='w-full'>
				<div className='flex items-center justify-items-stretch px-0 gap-2'>
					<Search />
					<TabsList className='grid grid-cols-2 h-10'>
						<TabsTrigger value='card'>
							<LayoutGrid size={18} />
						</TabsTrigger>
						<TabsTrigger value='list'>
							<List size={18} />
						</TabsTrigger>
					</TabsList>
					{websites?.length ? <WebsiteCreateButton /> : null}
				</div>
				<TabsContent value='card'>
					<WebsitesList websites={websites} />
				</TabsContent>
				<TabsContent value='list'>
					<WebsitesList websites={websites} />
				</TabsContent>
			</Tabs>
		</DashboardShell>
	);
}
