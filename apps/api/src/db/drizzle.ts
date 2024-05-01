import { schema } from '@heimdall-logs/db'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

export const getDbUrl = () => {
  if (process.env.NODE_ENV === 'production' || process.env.TURSO_DB_AUTH_TOKEN)
    return process.env.TURSO_DB_URL
  const workDir = process.cwd()
  const dir = workDir.split('/')
  const dbPath = `file:${dir
    .slice(0, dir.length - 2)
    .join('/')}/packages/db/db.sqlite`
  console.info(`[Database] ${dbPath}}`)
  return dbPath
}

const client = createClient({
  url: getDbUrl(),
  authToken: process.env.TURSO_DB_AUTH_TOKEN,
})

export const db = drizzle(client, {
  schema,
})
