import { env } from '@/env.mjs';
import { createClient } from '@clickhouse/client';

export const client = createClient({
	host: env.CLICKHOUSE_HOST,
	password: env.CLICKHOUSE_PASSWORD,
	username: env.CLICKHOUSE_USERNAME,
	database: env.CLICKHOUSE_DB,
});

export const getIsWebsiteActive = async ({
	websiteId,
}: {
	websiteId: string;
}) =>
	await client
		.query({
			query: `select id
              from default.event
              where websiteId = '${websiteId}' limit 1`,
			format: 'JSONEachRow',
		})
		.then(async (res) => (await res.json()) as { id: string }[]);

export const removeWebsiteData = async ({
	websiteId,
}: {
	websiteId: string;
}) => {
	const res = await client.query({
		query: `ALTER TABLE default.event DELETE WHERE websiteId = '${websiteId}'`,
	});
	console.log(res);
	return res;
};
