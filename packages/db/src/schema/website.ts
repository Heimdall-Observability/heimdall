import { relations } from 'drizzle-orm'
import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { teamMember } from '.'
import { boolean, date, id, userId } from './utils'

export const website = sqliteTable(
  'website',
  {
    id: id(),
    createdAt: date('createdAt'),
    url: text('url').notNull(),
    title: text('title'),
    userId: userId(),
    active: boolean('active').default(false).notNull(),
    public: boolean('public').default(false).notNull(),
  },
  (table) => ({
    websiteUserIdx: index('website_userIdx').on(table.userId),
  }),
)

export const websiteRelations = relations(website, ({ many }) => {
  return {
    teamWebsites: many(teamMember),
  }
})
