/**
 * TODO: Placeholder for the `@safaricom/mxl/request-context-storage` package.
 * Replace with the real package once it's published.
 */

/** @internal */
export interface MxlRequestContext {
  waitUntil: (
    promiseOrFunc: Promise<unknown> | (() => Promise<unknown>),
  ) => void
  headers: Record<string, string | undefined>
  url: string
  [key: symbol]: unknown
}

interface Reader {
  get: () => MxlRequestContext | undefined
}

const symbol = Symbol.for('@safaricom/mxl/request-context')

interface GlobalWithReader {
  [symbol]?: Reader
}

/** @internal */
export function getMxlRequestContext(): MxlRequestContext | undefined {
  const reader = (globalThis as GlobalWithReader)[symbol]
  return reader?.get()
}
