import { type Configuration, registerOTel } from '@vercel/otel'

export function register() {
  const config: Configuration = {
    serviceName: 'heimdall',
    instrumentationConfig: {
      fetch: {
        ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
        propagateContextUrls: [/^http:\/\/localhost:\d+/],
        dontPropagateContextUrls: [/no-propagation\=1/],
      },
    },
  }

  registerOTel(config)
}
