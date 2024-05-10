import type { Attributes, TextMapGetter } from '@opentelemetry/api'
import {
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_USER_AGENT,
} from '@opentelemetry/semantic-conventions'
import type { AttributesFromHeaders } from '../types'
import { omitUndefinedAttributes } from '../util/attributes'
import { parseRequestId } from '../util/request-id'
import type { MxlRequestContext } from './api'
import { getMxlRequestContext } from './api'

/** @internal */
export function getMxlRequestContextAttributes(
  context: MxlRequestContext | undefined = getMxlRequestContext(),
  attributesFromHeaders?: AttributesFromHeaders,
): Attributes | undefined {
  if (!context) {
    return undefined
  }

  const rootAttrs = attributesFromHeaders
    ? resolveAttributesFromHeaders(attributesFromHeaders, context.headers)
    : undefined

  return omitUndefinedAttributes({
    [SEMATTRS_HTTP_HOST]: context.headers.host,
    [SEMATTRS_HTTP_USER_AGENT]: context.headers['user-agent'],
    'http.referer': context.headers.referer,

    'heimdall.request_id': parseRequestId(context.headers['x-heimdall-id']),

    ...rootAttrs,
  })
}

type MxlRequestContextHeaders = MxlRequestContext['headers']

const getter: TextMapGetter<MxlRequestContextHeaders> = {
  keys(_carrier: MxlRequestContextHeaders): string[] {
    return []
  },
  get(
    carrier: MxlRequestContextHeaders,
    key: string,
  ): string | string[] | undefined {
    return carrier[key.toLocaleLowerCase()]
  },
}

function resolveAttributesFromHeaders(
  attributesFromHeaders: AttributesFromHeaders,
  headers: MxlRequestContextHeaders,
): Attributes | undefined {
  if (typeof attributesFromHeaders === 'function') {
    return attributesFromHeaders(headers, getter)
  }

  const attrs: Attributes = {}
  for (const [attrName, headerName] of Object.entries(attributesFromHeaders)) {
    const headerValue = headers[headerName.toLocaleLowerCase()]
    if (headerValue !== undefined) {
      attrs[attrName] = headerValue
    }
  }
  return attrs
}
