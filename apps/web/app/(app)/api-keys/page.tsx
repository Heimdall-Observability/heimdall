import { redirect } from 'next/navigation';

import {
	DeleteKeys,
	GenerateKeys,
} from '@/components/api-key-generate-buttons';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { formatDistanceToNow } from 'date-fns';

const apiKeys = async () => {
	const user = await getCurrentUser();
	if (!user) {
		return redirect('/login');
	}
	const keys = await db.query.apiKey
		.findMany({
			where(fields, operators) {
				return operators.eq(fields.userId, user.id);
			},
		})
		.then((res) => {
			return res.map((key) => ({
				...key,
				token:
					key.token.slice(0, 5) +
					'*'.repeat(key.token.length - 7) +
					key.token.slice(-2),
			}));
		});

	const websites = await db.query.website.findMany({
		where(fields, operators) {
			return operators.eq(fields.userId, user.id);
		},
	});

	return (
		<Card className='shadow-none'>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className=''>Name</TableHead>
							<TableHead className=''>Website</TableHead>
							<TableHead className=''>Key</TableHead>
							<TableHead>Expires In</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{keys.map((key) => (
							<TableRow key={key.id}>
								<TableCell>{key.name}</TableCell>
								<TableCell>
									{
										websites.find((website) => website.id === key.websiteId)
											?.title
									}
								</TableCell>
								<TableCell className=' ll-ctc flex items-center'>
									<div className='ll-ctc'>{key.token}</div>
								</TableCell>
								<TableCell>
									{formatDistanceToNow(key.expiresAt ?? new Date())}
								</TableCell>
								<TableCell className=' flex cursor-pointer justify-end'>
									<DeleteKeys id={key.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{!keys.length && (
						<TableCaption>No API keys generated yet :)</TableCaption>
					)}
				</Table>
			</CardContent>
			<CardFooter>
				<GenerateKeys disabled={!websites.length} />
			</CardFooter>
		</Card>
	);
};

export default apiKeys;
