import { getRangeDateForFilter } from './date'
import { views } from './table'

const isProduction = process.env.NODE_ENV === 'production'

const prod = 'https://plutus.francismasha.com'
const dev = 'http://localhost:3000'
const home = isProduction ? prod : dev

const url = {
  homeWithoutApp: home,
  home: home,
  api: home,
  serverApi: home,
  app: {
    overview: home,
  },
  twitter: 'https://twitter.com/FrancisMasha',
  github: 'https://github.com/mashafrancis/plutus',
  logoUrl: 'https://plutus.francismasha.com/logo.svg',
}

export const getApiUrl = (
  filterKey: string,
  apiPath: string,
  categories: string[] = [],
  isNotRange = false,
) => {
  if (isNotRange) {
    return `/api/${apiPath}`
  }

  if (filterKey === views.all.key) {
    return `/api/${apiPath}?categories=${categories?.join(',')}`
  }

  const [start, end] = getRangeDateForFilter(filterKey)
  return `/api/${apiPath}?from=${start}&to=${end}&categories=${categories?.join(
    ',',
  )}`
}

export default url
