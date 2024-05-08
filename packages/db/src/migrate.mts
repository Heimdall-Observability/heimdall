import 'dotenv/config'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

async function main() {
  const db = drizzle(
    createClient({
      url: process.env.TURSO_DB_URL as string,
      authToken: process.env.TURSO_DB_AUTH_TOKEN,
    }),
  )

  await migrate(db, {
    migrationsFolder: './migrations',
  })
}

main()
  .then(() => {
    console.info('✅: [Migration Complete]')
    process.exit(0)
  })
  .catch((e) => {
    console.error(`${e}, '❗:[Migration Failed]`)
    process.exit(1)
  })
