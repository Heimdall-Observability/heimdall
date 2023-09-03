import { DashboardHeader, MiniHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { WebsiteCreateButton } from '@/components/website-create-button';
import { WebsiteForm } from '@/components/website-create-form';
import WebsitesList from '@/components/websites-list';
import { getWebsite } from '@/server/query/website';

export default async function DashboardPage() {
	const { userWebsites, teamWebsites } = await getWebsite();
	const websites = userWebsites.concat(teamWebsites);

	return (
		<DashboardShell>
			<MiniHeader heading='Websites' text='Manage your websites.'>
				{websites?.length ? <WebsiteCreateButton /> : null}
			</MiniHeader>
			<WebsitesList />
		</DashboardShell>
	);
}
