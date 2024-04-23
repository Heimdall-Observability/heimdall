'use client';

import { fetcher } from '@/lib/utils';
import { HeimdallTraces } from '@heimdall-logs/types';
import { env } from 'env.mjs';
import useSWR from 'swr';

import { columns } from './column';
import { renderSubComponent } from './detail-modal';
import { DataTable } from './table-data';

const Traces = ({
	startDate,
	endDate,
	websiteId,
}: {
	startDate: Date;
	endDate: Date;
	websiteId: string;
}) => {
	const url = env.NEXT_PUBLIC_API_URL;
	const { data, isLoading } = useSWR<HeimdallTraces[]>(
		`${url}/traces?websiteId=${websiteId}&startDate=${startDate}&endDate=${endDate}`,
		fetcher
	);

	return (
		<div className='no-scrollbar'>
			<DataTable
				columns={columns}
				data={data ?? []}
				renderSubComponent={renderSubComponent}
				isLoading={isLoading}
			/>
		</div>
	);
};
export default Traces;
