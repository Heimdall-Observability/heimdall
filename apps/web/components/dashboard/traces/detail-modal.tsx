'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fancyId } from '@/lib/utils';
import { HeimdallTraces } from '@heimdall-logs/types';
import { Row } from '@tanstack/react-table';

const renderSubComponent = ({ row }: { row: Row<HeimdallTraces> }) => {
	const data = row.original;
	// console.log('Class: , Function: renderSubComponent, Line 11 data():', data);

	const metadata = {
		Service: data.ServiceName,
		'Trace ID': data.TraceId,
		'Span ID': data.SpanId,
		'Span kind': data.SpanKind,
		'Parent span ID': data.ParentSpanId,
		'Instrumentation scope': data.ScopeName,
		'Instrumentation scope version': data.ScopeVersion,
		Events: data['Events.Attributes'].length,
		Status: data.StatusCode,
		'Status message': data.StatusMessage,
	};

	const attributes = {
		'http.method': data.SpanAttributes?.['http.method'] ?? '',
		'http.url': data.SpanAttributes?.['http.url'] ?? '',
	};

	const resourceAttributes = {
		'telemetry.sdk.name': data.ResourceAttributes?.['telemetry.sdk.name'] ?? '',
		'telemetry.sdk.language':
			data.ResourceAttributes?.['telemetry.sdk.language'] ?? '',
		'telemetry.sdk.version':
			data.ResourceAttributes?.['telemetry.sdk.version'] ?? '',
		'service.name': data.ResourceAttributes?.['service.name'] ?? '',
		'service.namespace': data.ResourceAttributes?.['service.namespace'] ?? '',
	};

	const timings = {
		'Start time': new Date(data.Timestamp).toLocaleString(),
		'End time': new Date(data.Timestamp).toLocaleString(),
		'Response time': data.Duration,
	};

	return (
		<div className='w-full dark:border-muted-foreground/20 bg-muted/60 rounded-xl'>
			<Tabs defaultValue='metadata'>
				<TabsList>
					<TabsTrigger value='metadata'>Metadata</TabsTrigger>
					<TabsTrigger value='attributes'>Attributes</TabsTrigger>
					<TabsTrigger value='resourceAttributes'>
						Resource Attributes
					</TabsTrigger>
					<TabsTrigger value='timings'>Timings</TabsTrigger>
				</TabsList>
				<TabsContent value='metadata'>
					<div className='grid grid-cols-3 place-content-center gap-4 px-2 py-4 '>
						{Object.keys(metadata).map((key) => {
							return (
								<div
									className=' flex gap-2 border-b py-2 dark:border-muted-foreground/20'
									key={fancyId()}
								>
									<div className='font-bold'>{key}:</div>

									<div>
										{JSON.stringify(metadata[key as keyof typeof metadata])}
									</div>
								</div>
							);
						})}
					</div>
				</TabsContent>
				<TabsContent value='attributes'>
					<div className='grid grid-cols-3 place-content-center gap-4 px-2 py-4 '>
						{Object.keys(attributes).map((key) => {
							return (
								<div
									className=' flex gap-2 border-b py-2 dark:border-muted-foreground/20'
									key={fancyId()}
								>
									<div className='font-bold'>{key}:</div>
									<div>
										{JSON.stringify(attributes[key as keyof typeof attributes])}
									</div>
								</div>
							);
						})}
					</div>
				</TabsContent>
				<TabsContent value='resourceAttributes'>
					<div className='grid grid-cols-3 place-content-center gap-4 px-2 py-4 '>
						{Object.keys(resourceAttributes).map((key) => {
							return (
								<div
									className=' flex gap-2 border-b py-2 dark:border-muted-foreground/20'
									key={fancyId()}
								>
									<div className='font-bold'>{key}:</div>
									<div>
										{JSON.stringify(
											resourceAttributes[key as keyof typeof resourceAttributes]
										)}
									</div>
								</div>
							);
						})}
					</div>
				</TabsContent>
				<TabsContent value='timings'>
					<div className='grid grid-cols-3 place-content-center gap-4 px-2 py-4 '>
						{Object.keys(timings).map((key) => {
							return (
								<div
									className=' flex gap-2 border-b py-2 dark:border-muted-foreground/20'
									key={fancyId()}
								>
									<div className='font-bold'>{key}:</div>
									<div>
										{JSON.stringify(timings[key as keyof typeof timings])}
									</div>
								</div>
							);
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export { renderSubComponent };
