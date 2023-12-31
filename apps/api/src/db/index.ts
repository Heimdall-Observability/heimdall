import { logger } from '@heimdall-logs/logger';

import { heimdallDb } from './queries';

const type = process.env.CLICKHOUSE_HOST ? 'clickhouse' : 'sqlite';
logger.info(`Event Database ${type}}`);
export const eventDB = heimdallDb(type);
