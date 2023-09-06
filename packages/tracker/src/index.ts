import { heimdall } from './lib';
import { Config, Internal } from './types';

declare global {
	interface Window {
		llc: Config;
		lli: Internal;
	}
}
export { heimdall };
