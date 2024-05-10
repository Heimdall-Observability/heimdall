import type { ContextManager, TextMapPropagator } from '@opentelemetry/api'
import { DiagConsoleLogger, diag, metrics } from '@opentelemetry/api'
import { logs } from '@opentelemetry/api-logs'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager'
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
  baggageUtils,
  getEnvWithoutDefaults,
} from '@opentelemetry/core'
import {
  DEFAULT_ENVIRONMENT,
  parseEnvironment,
} from '@opentelemetry/core/build/src/utils/environment'
import type { InstrumentationOption } from '@opentelemetry/instrumentation'
import { registerInstrumentations } from '@opentelemetry/instrumentation/build/src/autoLoader'
import type { ResourceDetectionConfig } from '@opentelemetry/resources'
import {
  Resource,
  detectResourcesSync,
  envDetectorSync,
} from '@opentelemetry/resources'
import { LoggerProvider } from '@opentelemetry/sdk-logs'
import { MeterProvider } from '@opentelemetry/sdk-metrics'
import type {
  Sampler,
  SpanExporter,
  SpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import {
  AlwaysOffSampler,
  AlwaysOnSampler,
  BasicTracerProvider,
  BatchSpanProcessor,
  ParentBasedSampler,
  RandomIdGenerator,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { OTLPHttpJsonTraceExporter } from './exporters/exporter-trace-otlp-http-fetch'
import { OTLPHttpProtoTraceExporter } from './exporters/exporter-trace-otlp-proto-fetch'
import { FetchInstrumentation } from './instrumentations/fetch'
import { CompositeSpanProcessor } from './processor/composite-span-processor'
import type {
  Configuration,
  InstrumentationConfiguration,
  InstrumentationOptionOrName,
  PropagatorOrName,
  SampleOrName,
  SpanProcessorOrName,
} from './types'
import { omitUndefinedAttributes } from './util/attributes'
import { encodeGUID, guid } from './util/guid'

type Env = ReturnType<typeof parseEnvironment>

export class Sdk {
  private contextManager: ContextManager | undefined
  private tracerProvider: BasicTracerProvider | undefined
  private loggerProvider: LoggerProvider | undefined
  private meterProvider: MeterProvider | undefined
  private disableInstrumentations: (() => void) | undefined

  public constructor(private configuration: Configuration = {}) {}

  public start(): void {
    const env = getEnv()
    const envWithoutDefaults = getEnvWithoutDefaults()
    const configuration = this.configuration
    const runtime = process.env.NEXT_RUNTIME || 'nodejs'

    const disabled = Boolean(env.OTEL_SDK_DISABLED)

    // Default is INFO, use environment without defaults to check
    // if the user originally set the environment variable.
    if (envWithoutDefaults.OTEL_LOG_LEVEL) {
      diag.setLogger(new DiagConsoleLogger(), {
        logLevel: envWithoutDefaults.OTEL_LOG_LEVEL,
      })
    }

    if (disabled) {
      return
    }

    const idGenerator = configuration.idGenerator ?? new RandomIdGenerator()

    const contextManager =
      configuration.contextManager ?? new AsyncLocalStorageContextManager()
    contextManager.enable()
    this.contextManager = contextManager

    const serviceName =
      env.OTEL_SERVICE_NAME || configuration.serviceName || 'app'
    const entityId = encodeGUID(guid())
    let resource = new Resource(
      omitUndefinedAttributes({
        [SEMRESATTRS_SERVICE_NAME]: serviceName,

        // Node.
        'node.ci': process.env.CI ? true : undefined,
        'node.env': process.env.NODE_ENV,

        // MXL specific.
        // Add more attributes here.
        'entity.id': entityId,
        'entity.name': serviceName,
        'entity.type': 'SERVICE',

        ...configuration.attributes,
      }),
    )
    const resourceDetectors = configuration.resourceDetectors ?? [
      envDetectorSync,
    ]
    const autoDetectResources = configuration.autoDetectResources ?? true
    if (autoDetectResources) {
      const internalConfig: ResourceDetectionConfig = {
        detectors: resourceDetectors,
      }
      resource = resource.merge(detectResourcesSync(internalConfig))
    }

    const propagators = parsePropagators(configuration.propagators, env)
    const traceSampler = parseSampler(configuration.traceSampler, env)
    const spanProcessors = parseSpanProcessor(
      configuration.spanProcessors,
      configuration,
      env,
    )
    if (spanProcessors.length === 0) {
      diag.warn(
        '@heimdall-logs/nodejs-otel: No span processors configured. No spans will be exported.',
      )
    }
    const spanLimits = configuration.spanLimits
    const tracerProvider = new BasicTracerProvider({
      resource,
      idGenerator,
      sampler: traceSampler,
      spanLimits,
    })
    tracerProvider.addSpanProcessor(
      new CompositeSpanProcessor(
        spanProcessors,
        configuration.attributesFromHeaders,
      ),
    )
    tracerProvider.register({
      contextManager,
      propagator: new CompositePropagator({ propagators }),
    })
    this.tracerProvider = tracerProvider

    if (configuration.logRecordProcessor) {
      const loggerProvider = new LoggerProvider({ resource })
      this.loggerProvider = loggerProvider
      loggerProvider.addLogRecordProcessor(configuration.logRecordProcessor)
      logs.setGlobalLoggerProvider(loggerProvider)
    }

    if (configuration.metricReader || configuration.views) {
      const meterProvider = new MeterProvider({
        resource,
        views: configuration.views ?? [],
      })
      if (configuration.metricReader) {
        meterProvider.addMetricReader(configuration.metricReader)
      }
      metrics.setGlobalMeterProvider(meterProvider)
      this.meterProvider = meterProvider
    }

    const instrumentations = parseInstrumentations(
      configuration.instrumentations,
      configuration.instrumentationConfig,
    )
    this.disableInstrumentations = registerInstrumentations({
      instrumentations,
    })

    diag.info('@heimdall-logs/nodejs-otel: started', serviceName, runtime)
  }

  public async shutdown(): Promise<void> {
    const promises: Promise<unknown>[] = []

    if (this.tracerProvider) {
      promises.push(this.tracerProvider.shutdown())
    }
    if (this.loggerProvider) {
      promises.push(this.loggerProvider.shutdown())
    }
    if (this.meterProvider) {
      promises.push(this.meterProvider.shutdown())
    }

    diag.info(
      '@heimdall-logs/nodejs-otel: shutting down',
      promises.length,
      process.env.NEXT_RUNTIME,
    )

    await Promise.all(promises)

    if (this.contextManager) {
      this.contextManager.disable()
    }
    const { disableInstrumentations } = this
    if (disableInstrumentations) {
      disableInstrumentations()
    }
  }
}

function getEnv(): Env {
  const processEnv = parseEnvironment(process.env)
  return { ...DEFAULT_ENVIRONMENT, ...processEnv }
}

function parseInstrumentations(
  arg: InstrumentationOptionOrName[] | undefined,
  instrumentationConfig: InstrumentationConfiguration | undefined,
): InstrumentationOption[] {
  return (arg ?? ['auto']).flatMap((instrumentationOrName) => {
    if (instrumentationOrName === 'auto') {
      diag.debug(
        '@heimdall-logs/nodejs-otel: Configure instrumentations: fetch',
        instrumentationConfig?.fetch,
      )
      return [new FetchInstrumentation(instrumentationConfig?.fetch)]
    }
    if (instrumentationOrName === 'fetch') {
      diag.debug(
        '@heimdall-logs/nodejs-otel: Configure instrumentations: fetch',
        instrumentationConfig?.fetch,
      )
      return new FetchInstrumentation(instrumentationConfig?.fetch)
    }
    return instrumentationOrName
  })
}

function parsePropagators(
  arg: PropagatorOrName[] | undefined,
  env: Env,
): TextMapPropagator[] {
  const envPropagators =
    env.OTEL_PROPAGATORS && env.OTEL_PROPAGATORS.length > 0
      ? env.OTEL_PROPAGATORS
      : undefined
  return (arg ?? envPropagators ?? ['auto']).flatMap((propagatorOrName) => {
    if (propagatorOrName === 'none') {
      return []
    }
    if (propagatorOrName === 'auto') {
      diag.debug(
        '@heimdall-logs/nodejs-otel: Configure propagators: tracecontext, baggage',
      )
      return [new W3CTraceContextPropagator(), new W3CBaggagePropagator()]
    }
    if (propagatorOrName === 'tracecontext') {
      diag.debug(
        '@heimdall-logs/nodejs-otel: Configure propagator: tracecontext',
      )
      return new W3CTraceContextPropagator()
    }
    if (propagatorOrName === 'baggage') {
      diag.debug('@heimdall-logs/nodejs-otel: Configure propagator: baggage')
      return new W3CBaggagePropagator()
    }
    if (typeof propagatorOrName === 'string') {
      throw new Error(`Unknown propagator: "${propagatorOrName}"`)
    }
    return propagatorOrName
  })
}

const FALLBACK_OTEL_TRACES_SAMPLER = 'always_on'
const DEFAULT_RATIO = 1

/**
 * The code below is borrowed from the https://github.com/open-telemetry/opentelemetry-js/blob/b6e532bf52c9553e51aa6d3375e85f0dd9bd67c1/packages/opentelemetry-sdk-trace-base/src/config.ts#L64
 * bacause, unfortunately, OpenTelemetry API doesn't export it directly.
 */
function parseSampler(arg: SampleOrName | undefined, env: Env): Sampler {
  if (arg && typeof arg !== 'string') {
    return arg
  }

  const name =
    arg && arg !== 'auto'
      ? arg
      : env.OTEL_TRACES_SAMPLER || FALLBACK_OTEL_TRACES_SAMPLER
  diag.debug('@heimdall-logs/nodejs-otel: Configure sampler: ', name)
  switch (name) {
    case 'always_on':
      return new AlwaysOnSampler()
    case 'always_off':
      return new AlwaysOffSampler()
    case 'parentbased_always_on':
      return new ParentBasedSampler({
        root: new AlwaysOnSampler(),
      })
    case 'parentbased_always_off':
      return new ParentBasedSampler({
        root: new AlwaysOffSampler(),
      })
    case 'traceidratio':
      return new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(env))
    case 'parentbased_traceidratio':
      return new ParentBasedSampler({
        root: new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(env)),
      })
    default:
      diag.error(
        `@heimdall-logs/nodejs-otel: OTEL_TRACES_SAMPLER value "${String(
          env.OTEL_TRACES_SAMPLER,
        )} invalid, defaulting to ${FALLBACK_OTEL_TRACES_SAMPLER}".`,
      )
      return new AlwaysOnSampler()
  }
}

function getSamplerProbabilityFromEnv(env: Env): number {
  if (
    env.OTEL_TRACES_SAMPLER_ARG === undefined ||
    env.OTEL_TRACES_SAMPLER_ARG === ''
  ) {
    diag.error(
      `@heimdall-logs/nodejs-otel: OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`,
    )
    return DEFAULT_RATIO
  }

  diag.debug(
    '@heimdall-logs/nodejs-otel: Configure sampler probability: ',
    env.OTEL_TRACES_SAMPLER_ARG,
  )
  const probability = Number(env.OTEL_TRACES_SAMPLER_ARG)

  if (Number.isNaN(probability)) {
    diag.error(
      `@heimdall-logs/nodejs-otel: OTEL_TRACES_SAMPLER_ARG=${env.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${DEFAULT_RATIO}.`,
    )
    return DEFAULT_RATIO
  }

  if (probability < 0 || probability > 1) {
    diag.error(
      `@heimdall-logs/nodejs-otel: OTEL_TRACES_SAMPLER_ARG=${env.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`,
    )
    return DEFAULT_RATIO
  }

  return probability
}

function parseSpanProcessor(
  arg: SpanProcessorOrName[] | undefined,
  configuration: Configuration,
  env: Env,
): SpanProcessor[] {
  return [
    ...(arg ?? ['auto'])
      .map((spanProcessorOrName) => {
        if (spanProcessorOrName === 'auto') {
          if (process.env.MXL_OTEL_ENDPOINTS) {
            // OTEL collector is configured on port 4318.
            const port = process.env.MXL_OTEL_ENDPOINTS_PORT || '4318'
            // It's important to use x-protobuf here because the MXL collector
            // doesn't correctly process `TimeUnixNano{low, high}` encoding.
            const protocol =
              process.env.MXL_OTEL_ENDPOINTS_PROTOCOL || 'http/protobuf'
            diag.debug(
              '@heimdall-logs/nodejs-otel: Configure heimdall otel collector on port: ',
              port,
              protocol,
            )
            const config = {
              url: `http://localhost:${port}/v1/traces`,
              headers: {},
            }
            const exporter =
              protocol === 'http/protobuf'
                ? new OTLPHttpProtoTraceExporter(config)
                : new OTLPHttpJsonTraceExporter(config)
            return new BatchSpanProcessor(exporter)
          }

          // Consider going throw `MXL_OTEL_ENDPOINTS` (otel collector) for OTLP.
          if (
            !configuration.traceExporter ||
            configuration.traceExporter === 'auto' ||
            env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
            env.OTEL_EXPORTER_OTLP_ENDPOINT
          ) {
            return new BatchSpanProcessor(parseTraceExporter(env))
          }

          return undefined
        }
        return spanProcessorOrName
      })
      .filter(isNotNull),
    ...(configuration.traceExporter && configuration.traceExporter !== 'auto'
      ? [new BatchSpanProcessor(configuration.traceExporter)]
      : []),
  ]
}

/**
 * This code is moved from the https://github.com/open-telemetry/opentelemetry-js/blob/00e78efd840d3f49d9d4b025a9965e8d3f2913ad/experimental/packages/opentelemetry-sdk-node/src/TracerProviderWithEnvExporter.ts#L41
 * due to the https://github.com/open-telemetry/opentelemetry-js/issues/4212
 */
function parseTraceExporter(env: Env): SpanExporter {
  const protocol =
    process.env.OTEL_EXPORTER_OTLP_TRACES_PROTOCOL ??
    process.env.OTEL_EXPORTER_OTLP_PROTOCOL ??
    'http/protobuf'
  const url = buildExporterUrlFromEnv(env)
  const headers = {
    ...baggageUtils.parseKeyPairsIntoRecord(env.OTEL_EXPORTER_OTLP_HEADERS),
    ...baggageUtils.parseKeyPairsIntoRecord(
      env.OTEL_EXPORTER_OTLP_TRACES_HEADERS,
    ),
  }
  diag.debug(
    '@heimdall-logs/nodejs-otel: Configure trace exporter: ',
    protocol,
    url,
    `headers: ${Object.keys(headers).join(',') || '<none>'}`,
  )
  switch (protocol) {
    case 'http/json':
      return new OTLPHttpJsonTraceExporter({ url, headers })
    case 'http/protobuf':
      return new OTLPHttpProtoTraceExporter({ url, headers })
    default:
      // "grpc" protocol is not supported in Edge.
      diag.warn(
        `@heimdall-logs/nodejs-otel: Unsupported OTLP traces protocol: ${protocol}. Using http/protobuf.`,
      )
      return new OTLPHttpProtoTraceExporter()
  }
}

const DEFAULT_COLLECTOR_RESOURCE_PATH = 'v1/traces'
const DEFAULT_COLLECTOR_URL = `http://localhost:4318/${DEFAULT_COLLECTOR_RESOURCE_PATH}`

function buildExporterUrlFromEnv(env: Env): string {
  const defaultUrlFromEnv = env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT
  if (defaultUrlFromEnv && typeof defaultUrlFromEnv === 'string') {
    return defaultUrlFromEnv
  }

  const defaultUrlFromEnvAll = env.OTEL_EXPORTER_OTLP_ENDPOINT
  if (defaultUrlFromEnvAll && typeof defaultUrlFromEnvAll === 'string') {
    return `${defaultUrlFromEnvAll}/${DEFAULT_COLLECTOR_RESOURCE_PATH}`
  }

  return DEFAULT_COLLECTOR_URL
}

function isNotNull<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined
}
