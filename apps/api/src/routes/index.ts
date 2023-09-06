import { createEvents } from './event';
import { createHits } from './hits';
import { createPageview, updatePageDuration } from './pageview';
import { createSession } from './session';
import { RouterType } from './type';
import { createVisitor } from './visitor';

export const router: RouterType = async ({ path, ...rest }) => {
	switch (path) {
		case '/session':
			return await createSession(rest);
		case '/pageview':
			return await createPageview(rest);
		case '/session/pulse':
			return await updatePageDuration(rest);
		case '/event':
			return await createEvents(rest);
		case '/visitor':
			return await createVisitor(rest);
		case '/hits':
			return await createHits(rest);
		default:
			return {
				data: {
					message: 'Path Not found',
				},
				status: 404,
			};
	}
};
