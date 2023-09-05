import { env } from "../env";
import { eventDB } from "./db";
import { client, hitsQuery } from "./db/clickhouse";
import { db } from "./db/drizzle";
import { rateLimitCheck } from "./lib/rate-limit";
import { retryFunction } from "./lib/retry";
import { filter } from "./lib/small-filter";
import { convertToUTC } from "./lib/utils";
import { router } from "./routes";
import { getInsight } from "./routes/insight";
import { getTablesData } from "./routes/table";
import { apiQuery, insightPubApiSchema, insightSchema } from "./schema";
import { Filter, HeimdallEvent, Path } from "./type";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as appLogger } from "hono/logger";
import jwt from "jsonwebtoken";
import { logger } from "@heimdall/logger";

const app = new Hono();

app.use("*", appLogger());
app.use("*", cors());

app.post("/", async (c) => {
  const body = await c.req.json();
  const headers = Object.fromEntries(c.req.headers);
  const query = c.req.query();
  logger.info("body", body);
  if (!body.path) {
    return c.json(null, 200);
  }
  const path: Path = body.path;
  const res = await router({ path, rawBody: body, req: { headers, query } });
  logger.info(path, res);
  return c.json(null, res.status);
});

app.get("/", async (c) => {
  //authentication
  const queries = insightSchema.safeParse(c.req.query());
  if (!queries.success) {
    return c.json(null, 400);
  }
  const { startDate, endDate, timeZone, websiteId, token } = queries.data;
  try {
    jwt.verify(token, env.NEXTAUTH_SECRET, (err, decoded) => {
      if (err) {
        throw err;
      }
      //@ts-ignore
      if (decoded.website !== websiteId) {
        throw Error;
      }
    });
  } catch {
    return c.json(null, 401);
  }
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const duration = endDateObj.getTime() - startDateObj.getTime();
  const pastEndDateObj = new Date(startDateObj.getTime() - duration);
  try {
    const tick = performance.now();
    let [events, lastEvents] = await retryFunction(
      eventDB.getHits,
      [startDateObj, endDateObj, pastEndDateObj, websiteId],
      3,
      4,
    );
    const tack = performance.now();
    console.log(tack - tick, "ms taken to query");
    const filters = JSON.parse(queries.data.filter) as Filter<HeimdallEvent>[];
    filters.length &&
      filters.forEach((f) => {
        // @ts-expect-error
        events = filter(events).where(f.key, f.operator, f.value).execute();
        lastEvents = filter(lastEvents as HeimdallEvent[])
          .where(f.key, f.operator, f.value)
          .execute();
      });
    const insightData = getInsight(
      events as HeimdallEvent[],
      lastEvents as HeimdallEvent[],
    );
    const tableData = getTablesData(
      events as HeimdallEvent[],
      startDateObj,
      endDateObj,
      timeZone,
    );
    return c.json(
      {
        insight: insightData,
        ...tableData,
      },
      200,
    );
  } catch (e) {
    return c.json(e, 500);
  }
});

//TODO: should be changed the json to be parsed from clickhouse than js
app.get("/events", async (c) => {
  const startDateObj = new Date(c.req.query("startDate"));
  const endDateObj = new Date(c.req.query("endDate"));
  const websiteId = c.req.query("websiteId");
  try {
    const res = await eventDB.getCustomEvents(
      startDateObj,
      endDateObj,
      websiteId,
    );
    const events = res.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
    return c.json(events, 200);
  } catch {
    return c.json(null, 500);
  }
});

//api/v1
app.use("/v1/*", async (_, next) => {
  return await next();
});

app.get("/v1/hits", async (c) => {
  const query = c.req.query();
  const apiKey = c.req.headers.get("x-api-key");
  if (!apiKey) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const site = await db.query.apiKey.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.token, apiKey));
    },
  });
  if (!site) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const data = apiQuery.safeParse(query);
  if (!data.success) {
    return c.json({ message: "Bad request" }, 400);
  }
  const { startDate, endDate } = data.data;
  const websiteId = site.websiteId;
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  async function getData() {
    return await client
      .query({
        query: hitsQuery(
          convertToUTC(startDateObj),
          convertToUTC(endDateObj),
          websiteId,
        ),
        format: "JSONEachRow",
      })
      .then(async (res) => (await res.json()) as HeimdallEvent[]);
  }

  const res = await retryFunction(getData, [], 3, 4);
  return c.json(res, 200);
});

app.get("/v1/insight", async (c) => {
  const queries = insightPubApiSchema.safeParse(c.req.query());
  if (!queries.success) {
    return c.json(null, 400);
  }
  const { startDate, endDate, timeZone } = queries.data;
  const apiKey = queries.data.apiKey;
  const isRateLimited = await rateLimitCheck(apiKey);
  if (isRateLimited) {
    return c.json(
      JSON.stringify({
        message: "Rate limit exceeded",
      }),
      429,
    );
  }
  const site = await db.query.apiKey.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.token, apiKey));
    },
  });
  const websiteId = site.websiteId;
  const today = new Date();
  const startDateObj = new Date(
    startDate ??
      new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate(),
      ).toISOString(),
  );
  const endDateObj = new Date(endDate ?? today);
  const duration = endDateObj.getTime() - startDateObj.getTime();
  const pastEndDateObj = new Date(startDateObj.getTime() - duration);
  try {
    const tick = performance.now();
    let [events, lastEvents] = await retryFunction(
      eventDB.getHits,
      [startDateObj, endDateObj, pastEndDateObj, websiteId],
      3,
      4,
    );
    const tack = performance.now();
    logger.info(`${tack - tick}} ms taken to query`);
    const filters = JSON.parse(queries.data.filter) as Filter<HeimdallEvent>[];
    filters.length &&
      filters.forEach((f) => {
        // @ts-expect-error
        events = filter(events).where(f.key, f.operator, f.value).execute();
        lastEvents = filter(lastEvents as HeimdallEvent[])
          .where(f.key, f.operator, f.value)
          .execute();
      });
    const insightData = getInsight(
      events as HeimdallEvent[],
      lastEvents as HeimdallEvent[],
    );
    const tableData = getTablesData(
      events as HeimdallEvent[],
      startDateObj,
      endDateObj,
      timeZone,
    );
    return c.json(
      {
        insight: insightData,
        ...tableData,
      },
      200,
    );
  } catch (e) {
    return c.json(e, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    logger.info(`The app has started successfully ${info.port}}`);
  },
);
