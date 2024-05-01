import { identify, setConsent, track } from './methods'
import { record } from './record'

export const heimdall = {
  record: record,
  track: track,
  identify: identify,
  setConsent,
}
