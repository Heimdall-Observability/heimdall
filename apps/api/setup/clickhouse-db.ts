import { createClient } from '@clickhouse/client';
import { setupClickhouseDb } from '@heimdall-logs/setup';
import ora from 'ora';

const client = createClient({
	host: process.env.CLICKHOUSE_HOST,
	password: process.env.CLICKHOUSE_PASSWORD,
	database: process.env.CLICKHOUSE_DB,
	username: process.env.CLICKHOUSE_USERNAME,
});

const spinner = ora('Setting up clickhouse db').start();
// @ts-expect-error
setupClickhouseDb(client);
console.log('Done setting up clickhouse db');
spinner.stop();
