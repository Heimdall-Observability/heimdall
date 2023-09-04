import { DashboardHeader, MiniHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebsiteCreateButton } from '@/components/website-create-button';
import { WebsiteForm } from '@/components/website-create-form';
import WebsitesList from '@/components/websites-list';
import { getWebsite } from '@/server/query/website';

export default async function DashboardPage() {
	const { userWebsites, teamWebsites } = await getWebsite();
	const websites = userWebsites.concat(teamWebsites);

	return (
		<DashboardShell>
			<Tabs defaultValue='card' className='w-[400px]'>
				<MiniHeader heading='Websites' text='Manage your websites.'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='card'>Account</TabsTrigger>
						<TabsTrigger value='list'>Password</TabsTrigger>
					</TabsList>
					{websites?.length ? <WebsiteCreateButton /> : null}
				</MiniHeader>
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
