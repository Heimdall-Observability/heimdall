import React, { useEffect, useRef } from 'react';

import { heimdall } from '../lib';
import { record } from '../record';
import { Config, Internal } from '../types';

interface Props {
	config?: Partial<Config>;
}

declare global {
	interface Window {
		llc: Config;
		lli: Internal;
		i: any;
		logLib: typeof heimdall;
	}
}

/**
 * Initializes the web analytics tracker with the specified configuration options.
 * @param {Partial<Config>} [config] - The configuration options for the tracker. See {@link Config} for overview
 * @see [Documentation](https://heimdall.francismasha.com/docs) for details.
 */
function LogLib({ config }: Props) {
	useEffect(() => {
		record(config);
	}, []);
	return null;
}

type TrackViewProps = {
	/**
	 *  The name of the event to track.
	 */
	name: string;
	/**
	 * The payload to send with the event.
	 */
	payload?: Record<string, string>;
	children: React.ReactNode;
};

/**
 *  Tracks the view of the component when it is visible in the viewport.
 */
export function TrackView({ name, payload, children }: TrackViewProps) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const observable = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					heimdall.track(name, payload);
				}
			});
		});
		observable.observe(ref.current);
	}, []);
	return React.cloneElement(children as React.ReactElement, {
		ref,
	});
}

/**
 * a wrapper component that tracks the click event of the child component.
 */
export function TrackClick({ name, payload, children }: TrackViewProps) {
	return React.cloneElement(children as React.ReactElement, {
		onClick: () => {
			heimdall.track(name, payload);
		},
	});
}

export default LogLib;
