'use client';

import { useEffect } from 'react';

import { trace } from '@/lib/telemetry/trace';

// const {
// 	NEXT_PUBLIC_OTEL_SERVICE_NAME = '',
// 	NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
// } = typeof window !== 'undefined' ? process.env : {};

export default function FrontendTracer({
	collectorString,
	serviceName,
}: {
	collectorString?: string;
	serviceName?: string;
}) {
	useEffect(() => {
		trace({ collectorString, serviceName });
	}, []);

	return null;
}
