import { redirect } from 'next/navigation';

import React from 'react';

import { Dashboard } from '@/components/dashboard';
import { db } from '@/lib/db';
import { generateToken } from '@/lib/generate-token';
import { getCurrentUser } from '@/lib/session';
import { queries } from '@/server/query/queries';
import { schema } from '@heimdall/db';
import { eq } from 'drizzle-orm';

export default async function Page({
	params,
}: {
	params: { website: string };
}) {
	const user = await getCurrentUser();
	const token = generateToken({
		id: user?.id ?? 'public',
		website: params.website as string,
	});
	const websites = await db.query.website.findMany({
		with: {
			teamWebsites: {
				with: {
					team: {
						with: {
							teamMembers: true,
						},
					},
				},
			},
		},
	});

	const website = websites.find(
		(d) =>
			d.id === params.website ||
			d.teamWebsites.find((tw) => tw.websiteId === params.website)
	);
	const isAuthed = websites.find((d) => d.userId === user?.id);
	if (!website || (!isAuthed && website.public)) {
		return redirect('/');
	}
	const isPublic = website.public;
	const showSetup = isPublic
		? false
		: website.active
		? false
		: await (async () => {
				const haveSession = (await queries.getIsWebsiteActive(params.website))
					.length;
				if (haveSession) {
					await db
						.update(schema.website)
						.set({
							active: true,
						})
						.where(eq(schema.website.id, params.website));
					return false;
				}
				return true;
		  })();
	return (
		<main>
			<Dashboard
				website={website}
				isPublic={isPublic}
				showSetup={showSetup}
				token={token}
			/>
		</main>
	);
}
