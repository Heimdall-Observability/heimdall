import { z } from 'zod';

import { client } from '../db/clickhouse';
import { apiResponse } from '../lib/api-response';
import { RouteType } from './type';

const visitorInput = z.object({
	data: z.record(z.any()),
	id: z.string(),
	websiteId: z.string(),
});

export const createVisitor: RouteType = async ({ rawBody }) => {
	const body = visitorInput.safeParse(rawBody);
	if (body.success) {
		try {
			const { websiteId, id, data } = body.data;
			await client.insert({
				table: 'heimdall_logs.visitor',
				values: {
					id,
					identifiedId: data.identifiedId ?? id,
					properties: JSON.stringify(data),
					websiteId,
				},
			});
			return {
				data: {
					message: 'User updated',
				},
				status: 200,
			};
		} catch {
			return apiResponse.serverError;
		}
	} else {
		return apiResponse.badRequest;
	}
};
