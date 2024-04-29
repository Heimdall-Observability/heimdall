import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
	CompositePropagator,
	W3CBaggagePropagator,
	W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import {
	Resource,
	browserDetector,
	detectResourcesSync,
} from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import { SessionIdProcessor } from './session-id-processor';
import { Config } from './types';

// const COLLECTOR_STRING = 'https://otelcol.francismasha.com/v1/traces';
const COLLECTOR_STRING = 'http://localhost:4318/v1/traces';

export async function trace({ collector, id }: Partial<Config>) {
	const { ZoneContextManager } = await import('@opentelemetry/context-zone');

	let resource = new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: id,
		[SemanticResourceAttributes.SERVICE_VERSION]: '0.0.1',
	});

	// Setup Propagator
	const propagator = new CompositePropagator({
		propagators: [
			new B3Propagator(),
			new B3Propagator({ injectEncoding: B3InjectEncoding.MULTI_HEADER }),
			new W3CBaggagePropagator(),
			new W3CTraceContextPropagator(),
		],
	});

	const detectedResources = detectResourcesSync({
		detectors: [browserDetector],
	});

	resource = resource.merge(detectedResources);
	const provider = new WebTracerProvider({
		resource,
	});

	// Uncomment this to enable debugging using consoleExporter
	// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
	provider.addSpanProcessor(new SessionIdProcessor());
	provider.addSpanProcessor(
		new BatchSpanProcessor(
			new OTLPTraceExporter({
				url: collector || COLLECTOR_STRING,
				// headers: {
				// 	'content-type': 'application/json',
				// },
			})
		)
	);

	const contextManager = new ZoneContextManager();

	provider.register({
		contextManager,
		propagator,
	});

	registerInstrumentations({
		tracerProvider: provider,
		instrumentations: [
			// new DocumentLoadInstrumentation(),
			// new UserInteractionInstrumentation(),
			// new XMLHttpRequestInstrumentation(),
			getWebAutoInstrumentations({
				'@opentelemetry/instrumentation-fetch': {
					propagateTraceHeaderCorsUrls: /.*/,
					clearTimingResources: true,
					applyCustomAttributesOnSpan(span) {
						span.setAttribute('app.synthetic_request', 'true');
					},
				},
				'@opentelemetry/instrumentation-xml-http-request': {
					enabled: true,
					ignoreUrls: ['/localhost:8081/sockjs-node'],
					clearTimingResources: true,
					propagateTraceHeaderCorsUrls: [/.+/g],
				},
				'@opentelemetry/instrumentation-document-load': {
					enabled: true,
				},
				'@opentelemetry/instrumentation-user-interaction': {
					enabled: true,
				},
			}),
		],
	});
}
