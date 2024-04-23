import { logger } from '@heimdall-logs/logger';
import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function main() {
	const arg1 = (process.env.TURSO_DB_URL as string) ?? 'file:./db.sqlite';
	const arg2 = process.env.TURSO_DB_AUTH_TOKEN as string;
	console.log(
		'⌗ Starting Migration',
		'[Database]:',
		arg1,
		'[Auth Token]:',
		arg2
	);
	const client = createClient({
		url: arg1,
		authToken: arg2,
	});
	const db = drizzle(client);
	await migrate(db, {
		migrationsFolder: './migrations',
	});
}

main()
	.then(() => {
		logger.info('✅: [Migration Complete]');
		process.exit(0);
	})
	.catch((e) => {
		logger.error(`${e}, '❗️:[Migration Failed]`);
		process.exit(1);
	});
