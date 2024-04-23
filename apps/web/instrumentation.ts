// export const registerOTel = (serviceName: string) => {
// 	const sdk = new NodeSDK({
// 		resource: new Resource({
// 			[SemanticResourceAttributes.SERVICE_NAME]: serviceName,
// 		}),
// 		spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
// 	});
// 	sdk.start();
// };

export function register() {
	// registerOTel('heimdall');
	// const collector = getCookie('otelCollectorUrl')?.toString() || '';
	// FrontendTracer(collector);
}
