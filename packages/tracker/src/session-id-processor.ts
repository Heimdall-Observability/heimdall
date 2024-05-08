import { Context } from '@opentelemetry/api'
import { ReadableSpan, Span, SpanProcessor } from '@opentelemetry/sdk-trace-web'

import { AttributeNames } from './enums/attribute-names'
import Session from './session'

const { userId } = Session.getSession()

export class SessionIdProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve()
  }

  // @ts-expect-error
  onStart(span: Span, _parentContext: Context): void {
    span.setAttribute(AttributeNames.SESSION_ID, userId)
  }

  // @ts-expect-error
  onEnd(_span: ReadableSpan): void {}

  shutdown(): Promise<void> {
    return Promise.resolve()
  }
}
