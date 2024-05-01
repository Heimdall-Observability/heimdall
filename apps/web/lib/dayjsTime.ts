import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import objectSupport from 'dayjs/plugin/objectSupport'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc, { parseToLocal: true })
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(duration)
dayjs.extend(objectSupport)
dayjs.tz.guess()

export default dayjs
