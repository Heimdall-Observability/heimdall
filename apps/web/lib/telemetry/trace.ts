import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
	CompositePropagator,
	W3CBaggagePropagator,
	W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
	Resource,
	browserDetector,
	detectResourcesSync,
} from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

interface Props {
	collectorString?: string;
	serviceName?: string;
}

export function trace({ collectorString, serviceName }: Props) {
	let resource = new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: serviceName ?? 'Heimdall',
	});

	const detectedResources = detectResourcesSync({
		detectors: [browserDetector],
	});
	resource = resource.merge(detectedResources);
	const provider = new WebTracerProvider({
		resource,
	});

	provider.addSpanProcessor(
		new SimpleSpanProcessor(
			new OTLPTraceExporter({
				url:
					// NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
					collectorString ?? 'https://otelcol.francismasha.com/v1/traces',
			})
		)
	);

	// const contextManager = new ZoneContextManager();

	provider.register({
		// contextManager,
		propagator: new CompositePropagator({
			propagators: [
				new W3CBaggagePropagator(),
				new W3CTraceContextPropagator(),
			],
		}),
	});

	registerInstrumentations({
		tracerProvider: provider,
		instrumentations: [
			getWebAutoInstrumentations({
				'@opentelemetry/instrumentation-fetch': {
					propagateTraceHeaderCorsUrls: /.*/,
					clearTimingResources: true,
					applyCustomAttributesOnSpan(span) {
						span.setAttribute('app.synthetic_request', 'false');
					},
				},
			}),
		],
	});
}
