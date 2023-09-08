import { ClickHouseClient } from '@clickhouse/client';
import { createClient } from '@clickhouse/client';

import { env } from '../env';

export const setupClickhouseDb = async (
	client: ClickHouseClient,
	brokerList: string
) => {
	await client.exec({
		query: 'CREATE DATABASE IF NOT EXISTS heimdall_logs',
	});

	await client.exec({
		query: `CREATE TABLE IF NOT EXISTS heimdall_logs.event
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
                  ORDER BY (id, websiteId, timestamp, event)`,
	});

	await client.exec({
		query: `CREATE TABLE IF NOT EXISTS heimdall_logs.event_queue
            (
                id         String,
                event      String,
                sessionId  String,
                visitorId  String,
                properties String,
                timestamp  DateTime,
                websiteId  String,
                sign       Int8
            )
        ENGINE = Kafka
            SETTINGS kafka_broker_list = '${brokerList}',
                kafka_topic_list = 'events',
                kafka_group_name = 'event_consumer_group',
                kafka_format = 'JSONEachRow',
                kafka_max_block_size = 1048576,
                kafka_handle_error_mode = 'stream';`,
	});

	await client.exec({
		query: `CREATE MATERIALIZED VIEW IF NOT EXISTS heimdall_logs.event_queue_mv TO heimdall_logs.event AS
        SELECT id,
        event,
        sessionId,
        visitorId,
        properties,
        timestamp,
        websiteId,
        sign
        FROM heimdall_logs.event_queue;`,
	});

	await client.exec({
		query: `
        CREATE MATERIALIZED VIEW IF NOT EXISTS heimdall_logs.event_errors_mv
        (
            error String,
            raw String
        )
        ENGINE = MergeTree
        ORDER BY (error, raw)
        SETTINGS index_granularity = 8192 AS
        SELECT _error AS error,
            _raw_message AS raw
        FROM heimdall_logs.event_queue
        WHERE length(_error) > 0;
        `,
	});
};

async function main() {
	const client = createClient({
		host: env.CLICKHOUSE_HOST,
		password: env.CLICKHOUSE_PASSWORD,
	});
	await setupClickhouseDb(client, env.KAFKA_BROKER);
}

main();
