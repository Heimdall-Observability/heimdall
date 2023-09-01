import { env } from '@/env.mjs';
import { schema } from '@heimdall/db';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

export const getDbUrl = () => {
	if (process.env.NODE_ENV === 'production' || env.DATABASE_AUTH_TOKEN)
		return env.DATABASE_URL;
	const workDir = process.cwd();
	const dir = workDir.split('/');
	const dbPath = `file:${dir
		.slice(0, dir.length - 2)
		.join('/')}/packages/db/db.sqlite`;
	console.log('⌗ [Database]:', dbPath);
	return dbPath;
};

const client = createClient({
	url: getDbUrl(),
	authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
	schema,
});
