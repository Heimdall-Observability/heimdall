import { WEBSITE_NAMES, WEBSITE_SHORTNAMES } from '@/types/website'

const solutions = {
  // [WEBSITE_SHORTNAMES.ANALYTICS]: {
  //   name: WEBSITE_NAMES.ANALYTICS,
  //   description: 'Monitor and analyze frontend performance.',
  //   description_short: 'Monitor and analyze frontend performance.',
  //   label: '',
  //   url: '/dashboard/analytics',
  // },
  // [WEBSITE_SHORTNAMES.INSIGHTS]: {
  //   name: WEBSITE_NAMES.INSIGHTS,
  //   description: 'Monitor your infrastructure with deep insights.',
  //   description_short: 'Monitor your infrastructure.',
  //   label: '',
  //   url: '/dashboard/insights',
  // },
  // [WEBSITE_SHORTNAMES.WEB_VITALS]: {
  //   name: WEBSITE_NAMES.WEB_VITALS,
  //   description: 'Monitor your infrastructure with deep insights.',
  //   description_short: 'Monitor your infrastructure.',
  //   label: '',
  //   url: '/dashboard/web-vitals',
  // },
  [WEBSITE_SHORTNAMES.RUNTIME_LOGS]: {
    name: WEBSITE_NAMES.RUNTIME_LOGS,
    description: 'Monitor your infrastructure with deep insights.',
    description_short: 'Monitor your infrastructure.',
    label: '',
    url: '/dashboard/runtime-logs',
  },
}

export default solutions
