import type { Context } from '@opentelemetry/api'
import type {
  ReadableSpan,
  Span,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-web'

import { AttributeNames } from './enums/attribute-names'
import Session from './session'

const { userId } = Session.getSession()

export class SessionIdProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve()
  }

  onStart(span: Span, _parentContext: Context): void {
    span.setAttribute(AttributeNames.SESSION_ID, userId)
  }

  onEnd(_span: ReadableSpan): void {}

  shutdown(): Promise<void> {
    return Promise.resolve()
  }
}
