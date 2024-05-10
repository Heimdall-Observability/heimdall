import { clickhouseClient as client } from '@heimdall-logs/db'

export const getIsWebsiteActive = async ({
  websiteId,
}: {
  websiteId: string
}) =>
  await client
    .query({
      query: `select id
              from default.event
              where websiteId = '${websiteId}' limit 1`,
      format: 'JSONEachRow',
    })
    .then(async (res) => (await res.json()) as { id: string }[])

export const removeWebsiteData = async ({
  websiteId,
}: {
  websiteId: string
}) => {
  const res = await client.query({
    query: `ALTER TABLE default.event DELETE WHERE websiteId = '${websiteId}'`,
  })
  console.log(res)
  return res
}
