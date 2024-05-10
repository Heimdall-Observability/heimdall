// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import { type Configuration, registerOTel } from '@heimdall-logs/nodejs-otel'

export function register() {
  const config: Configuration = {
    serviceName: 'heimdall',
    // traceExporter: new OTLPTraceExporter({
    //   url:
    //     process.env.OTEL_EXPORTER_OTLP_ENDPOINT ??
    //     'http://localhost:4318/v1/traces',
    // }),
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
