import { heimdall } from './lib'
import type { Config, Internal } from './types'

declare global {
  interface Window {
    llc: Config
    lli: Internal
  }
}
export { heimdall }
