import { kafka } from '@heimdall-logs/clickhouse'
import { clickhouseClient as client, db, schema } from '@heimdall-logs/db'
import { sql } from 'drizzle-orm'

import { VitalDateWithSession } from '@heimdall-logs/types/tracker'
import { convertToUTC } from '../lib/utils'
import { EventRes, HeimdallEvent } from '../type'

const getStringJsonExtract = (q: string[]) => {
  return q
    .map((val) => `JSONExtract(properties, ${val}, "String") as ${val}`)
    .join(',')
}

export const hitsQuery = (
  startDate: string,
  endDate: string,
  websiteId: string,
) =>
  `select id,
          sessionId,
          visitorId,
          JSONExtract(properties, 'city', 'String')           as city,
          JSONExtract(properties, 'country', 'String')        as country,
          JSONExtract(properties, 'browser', 'String')        as browser,
          JSONExtract(properties, 'language', 'String')       as locale,
          JSONExtract(properties, 'referrerPath', 'String')   as referrerPath,
          JSONExtract(properties, 'currentPath', 'String')    as currentPath,
          JSONExtract(properties, 'referrerDomain', 'String') as referrerDomain,
          JSONExtract(properties, 'queryParams', 'String')    as queryParams,
          JSONExtract(properties, 'device', 'String')         as device,
          JSONExtract(properties, 'duration', 'Float32')      as duration,
          JSONExtract(properties, 'os', 'String')             as os,
          event,
          timestamp
   from default.event
   WHERE ${
     startDate && `timestamp >= '${startDate}' AND`
   } timestamp <= '${endDate}' AND websiteId = '${websiteId}' AND event = 'hits'`

export const customEventsQuery = (
  startDate: string,
  endDate: string,
  websiteId: string,
) =>
  `select *
   from default.event
   WHERE websiteId = '${websiteId}'
     AND timestamp <= '${endDate}'
     AND timestamp >= '${startDate}'
     AND event != 'hits'`

export const tracesQuery = (
  startDate: string,
  endDate: string,
  _websiteId: string,
) =>
  `SELECT *
   FROM default.otel_traces
   WHERE Timestamp <= '${endDate}'
     AND Timestamp >= '${startDate}'
     AND SpanName != 'click'
   ORDER BY Timestamp DESC
   LIMIT 100`

export const vitalsQuery = (
  startDate: string,
  endDate: string,
  websiteId: string,
) => {
  getStringJsonExtract([
    'country',
    'city',
    'browser',
    'language',
    'currentPath',
    'delta',
    'navigationType',
    'rating',
    'value',
    'name',
    'os',
  ])
  return `select id, sessionId, visitorId, properties, timestamp from default.event WHERE timestamp >= '${startDate}' AND timestamp <= '${endDate}' AND websiteId = '${websiteId}' AND event = 'vitals'`
}

const createEvent = () => {
  return async ({
    id,
    sessionId,
    visitorId,
    websiteId,
    queryParams,
    referrerDomain,
    country,
    city,
    language,
    device,
    os,
    browser,
    duration,
    currentPath,
    referrerPath,
    event,
    payload,
    type,
    pageId,
  }: HeimdallEvent & {
    payload?: string
    pageId?: string
    type?: string
  }) => {
    return {
      clickhouse: async () => {
        const { enabled, sendMessages, connect } = kafka
        const value = {
          id,
          sessionId,
          visitorId,
          websiteId,
          event,
          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          properties: JSON.stringify({
            queryParams: queryParams ? JSON.stringify(queryParams) : '{}',
            referrerDomain,
            country,
            city,
            language,
            device,
            os,
            browser,
            duration,
            currentPath,
            referrerPath,
            payload,
            type,
            pageId,
          }),
          sign: 1,
        }
        if (enabled) {
          await connect()
          await sendMessages([value], 'events')
        } else {
          await client
            .insert({
              table: 'default.event',
              values: [value],
              format: 'JSONEachRow',
            })
            .then((res) => res)
        }
      },
      sqlite: async () =>
        db.insert(schema.events).values({
          id,
          sessionId,
          visitorId,
          websiteId,
          event,
          timestamp: new Date(),
          properties: {
            queryParams,
            referrerDomain,
            country,
            city,
            language,
            device,
            os,
            browser,
            duration,
            currentPath,
            referrerPath,
          },
        }),
    }
  }
}

type InsertEventParams = {
  id: string
  sessionId: string
  visitorId: string
  websiteId: string
  event: string
  properties: string
  timestamp: string
  sign: 1 | -1
}

const createEvents = (data: InsertEventParams[]) => {
  return {
    clickhouse: async () => {
      const { enabled, sendMessages, connect } = kafka
      if (enabled) {
        await connect()
        await sendMessages(data, 'events')
      } else {
        await client
          .insert({
            table: 'default.event',
            values: data,
            format: 'JSONEachRow',
          })
          .then((res) => res)
      }
    },
    sqlite: async () => {
      await db.insert(schema.events).values(
        data.map((d) => ({
          ...d,
          timestamp: new Date(),
          properties: JSON.parse(d.properties),
        })),
      )
    },
  }
}

async function getHitsData(
  startDateObj: Date,
  endDateObj: Date,
  websiteId: string,
) {
  return {
    sqlite: async () => {
      const event = schema.events
      return await db
        .select()
        .from(event)
        .where(
          sql`${event.websiteId} = ${websiteId}
          and event = 'hits'
          and ${event.timestamp} >= ${new Date(startDateObj.getTime())}
          and ${event.timestamp} <= ${new Date(endDateObj).getTime()}`,
        )
        .then((res) =>
          res.map((event) => {
            const { properties, timestamp, ...rest } = event
            return {
              ...rest,
              ...properties,
              timestamp: timestamp.toISOString().slice(0, 19).replace('T', ' '),
            }
          }),
        )
    },
    clickhouse: async () => {
      return await client
        .query({
          query: hitsQuery(
            convertToUTC(startDateObj),
            convertToUTC(endDateObj),
            websiteId,
          ),
          format: 'JSONEachRow',
        })
        .then(async (res) => {
          return (await res.json()) as HeimdallEvent[]
        })
    },
  }
}

async function getCustomEventData(
  startDateObj: Date,
  endDateObj: Date,
  websiteId: string,
) {
  return {
    sqlite: async () => {
      const event = schema.events
      return await db
        .select()
        .from(event)
        .where(
          sql`${event.websiteId} =
          ${websiteId}
          and
          event
          !=
          'hits'
          and
          ${event.timestamp}
          >=
          ${new Date(startDateObj.getTime())}
          and
          ${event.timestamp}
          <=
          ${new Date(endDateObj).getTime()}`,
        )
        .then((res) =>
          res.map((event) => {
            const { properties, timestamp, ...rest } = event
            return {
              ...rest,
              ...properties,
              timestamp: timestamp.toISOString().slice(0, 19).replace('T', ' '),
            }
          }),
        )
    },
    clickhouse: async () => {
      return await client
        .query({
          query: customEventsQuery(
            convertToUTC(startDateObj),
            convertToUTC(endDateObj),
            websiteId,
          ),
          format: 'JSONEachRow',
        })
        .then(async (res) => (await res.json()) as EventRes[])
        .then((res) =>
          res.map((s) => {
            const properties = JSON.parse(s.properties)
            return {
              ...properties,
              id: s.id,
              event: s.event,
              sessionId: s.sessionId,
              websiteId: s.websiteId,
              visitorId: s.visitorId,
              timestamp: s.timestamp,
              duration: properties.duration ?? 0,
            }
          }),
        )
    },
  }
}

function getSiteVitals(websiteId: string, startDate: Date, endDate: Date) {
  return {
    sqlite: async () => {
      const event = schema.events
      return await db
        .select()
        .from(event)
        .where(
          sql`${event.websiteId} = ${websiteId} and event = 'vitals' and ${
            event.timestamp
          } >= ${new Date(startDate.getTime())} and ${
            event.timestamp
          } <= ${new Date(endDate).getTime()}`,
        )
        .then((res) =>
          res.map((r) => ({
            ...r,
            ...r.properties,
            timestamp: r.timestamp.toISOString().slice(0, 19).replace('T', ' '),
          })),
        )
    },
    clickhouse: async () => {
      return await client
        .query({
          query: vitalsQuery(
            convertToUTC(startDate),
            convertToUTC(endDate),
            websiteId,
          ),
          format: 'JSONEachRow',
        })
        .then(async (res) => (await res.json()) as VitalDateWithSession[])
    },
  }
}

async function getTraceData(
  startDateObj: Date,
  endDateObj: Date,
  websiteId: string,
) {
  return {
    sqlite: async () => {
      const event = schema.events
      return await db
        .select()
        .from(event)
        .where(
          sql`${event.websiteId} =
          ${websiteId}
          and
          event
          !=
          'hits'
          and
          ${event.timestamp}
          >=
          ${new Date(startDateObj.getTime())}
          and
          ${event.timestamp}
          <=
          ${new Date(endDateObj).getTime()}`,
        )
        .then((res) =>
          res.map((event) => {
            const { properties, timestamp, ...rest } = event
            return {
              ...rest,
              ...properties,
              timestamp: timestamp.toISOString().slice(0, 19).replace('T', ' '),
            }
          }),
        )
    },
    clickhouse: async () => {
      return client
        .query({
          query: tracesQuery(
            convertToUTC(startDateObj),
            convertToUTC(endDateObj),
            websiteId,
          ),
          format: 'JSONEachRow',
        })
        .then(async (res) => await res.json())
    },
  }
}

async function getTracesData(
  startDateObj: Date,
  endDateObj: Date,
  websiteId: string,
) {
  return client
    .query({
      query: tracesQuery(
        convertToUTC(startDateObj),
        convertToUTC(endDateObj),
        websiteId,
      ),
      format: 'JSONEachRow',
    })
    .then(async (res) => await res.json())
}

export function heimdallDb(db: 'sqlite' | 'clickhouse') {
  return {
    async insertEvent(
      data: HeimdallEvent & {
        payload?: string
        pageId?: string
        type?: string
      },
    ) {
      const hits = createEvent()
      const insert = await hits(data)
      return insert[db]()
    },
    async insertEvents(data: InsertEventParams[]) {
      const insert = createEvents(data)
      await insert[db]()
    },
    async getHits(
      startDateObj: Date,
      endDateObj: Date,
      pastEndDateObj: Date,
      websiteId: string,
    ) {
      const query1 = await getHitsData(startDateObj, endDateObj, websiteId)
      const query2 = await getHitsData(endDateObj, pastEndDateObj, websiteId)
      return await Promise.all([query1[db](), query2[db]()])
    },
    async getCustomEvents(
      startDateObj: Date,
      endDateObj: Date,
      websiteId: string,
    ) {
      const query = await getCustomEventData(
        startDateObj,
        endDateObj,
        websiteId,
      )
      return await query[db]()
    },
    async getTraces(startDateObj: Date, endDateObj: Date, websiteId: string) {
      const query = await getTracesData(startDateObj, endDateObj, websiteId)

      return query
    },
    async getVital(
      startDateObj: Date,
      endDateObj: Date,
      pastEndDateObj: Date,
      websiteId: string,
    ): Promise<[VitalDateWithSession[], VitalDateWithSession[]]> {
      const query1 = getSiteVitals(websiteId, startDateObj, endDateObj)[db]
      const query2 = getSiteVitals(websiteId, endDateObj, pastEndDateObj)[db]
      const data = await Promise.all([
        query1().then((res) =>
          res.map((r) => {
            const { properties, ...rest } = r
            const propertiesJson = JSON.parse(properties)
            return {
              ...propertiesJson,
              ...rest,
            } as VitalDateWithSession
          }),
        ),
        query2().then((res) =>
          res.map((r) => {
            const { properties, ...rest } = r
            const propertiesJson = JSON.parse(properties)
            return {
              ...propertiesJson,
              ...rest,
            } as VitalDateWithSession
          }),
        ),
      ])
      return data
    },
  }
}
