import { type Configuration, registerOTel } from '@heimdall-logs/nodejs-otel'

export function register() {
  const config: Configuration = {
    serviceName: 'localhost',
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
