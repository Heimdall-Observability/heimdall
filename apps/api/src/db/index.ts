import { heimdallDb } from './queries'

const type = process.env.CLICKHOUSE_HOST ? 'clickhouse' : 'sqlite'
console.info(`Event Database ${type}}`)
export const eventDB = heimdallDb(type)
