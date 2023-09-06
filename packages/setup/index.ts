import { ClickHouseClient } from '@clickhouse/client';

export const setupClickhouseDb = async (client: ClickHouseClient) => {
	await client.exec({
		query: 'CREATE DATABASE IF NOT EXISTS heimdall_logs',
	});
	await client.exec({
		query: `CREATE TABLE heimdall_logs.event
            (
                id         String,
                event      String,
                sessionId  String,
                visitorId  String,
                properties String   DEFAULT '{}',
                timestamp  DateTime DEFAULT now(),
                websiteId  String,
                sign       Int8
            ) ENGINE = CollapsingMergeTree(sign)
        ORDER BY (id)`,
	});
};
