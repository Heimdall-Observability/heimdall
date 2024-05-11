export type WEBSITE = WEBSITE_SHORTNAMES.RUNTIME_LOGS
// | WEBSITE_SHORTNAMES.INSIGHTS
// | WEBSITE_SHORTNAMES.WEB_VITALS
// | WEBSITE_SHORTNAMES.ANALYTICS

export enum WEBSITE_NAMES {
  ANALYTICS = 'Analytics',
  INSIGHTS = 'Insights',
  WEB_VITALS = 'Web vitals',
  RUNTIME_LOGS = 'Runtime logs',
}

export enum WEBSITE_SHORTNAMES {
  ANALYTICS = 'analytics',
  INSIGHTS = 'insights',
  WEB_VITALS = 'web_vitals',
  RUNTIME_LOGS = 'runtime_logs',
}

export interface WebsiteProps {
  name: WEBSITE_NAMES
}

export type Website = {
  [website in WEBSITE]: WebsiteProps
}

export const websites: Website = {
  // analytics: {
  //   name: WEBSITE_NAMES.ANALYTICS,
  // },
  // insights: {
  //   name: WEBSITE_NAMES.INSIGHTS,
  // },
  // web_vitals: {
  //   name: WEBSITE_NAMES.WEB_VITALS,
  // },
  // traces: {
  //   name: WEBSITE_NAMES.RUNTIME_LOGS,
  // },
  runtime_logs: {
    name: WEBSITE_NAMES.RUNTIME_LOGS,
  },
}
