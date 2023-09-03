'use client';

import React, { useEffect, useState } from 'react';

interface DateTimeFormatOptions {
	localeMatcher?: 'best fit' | 'lookup' | undefined;
	weekday?: 'long' | 'short' | 'narrow' | undefined;
	era?: 'long' | 'short' | 'narrow' | undefined;
	year?: 'numeric' | '2-digit' | undefined;
	month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
	day?: 'numeric' | '2-digit' | undefined;
	hour?: 'numeric' | '2-digit' | undefined;
	minute?: 'numeric' | '2-digit' | undefined;
	second?: 'numeric' | '2-digit' | undefined;
	timeZoneName?:
		| 'short'
		| 'long'
		| 'shortOffset'
		| 'longOffset'
		| 'shortGeneric'
		| 'longGeneric'
		| undefined;
	formatMatcher?: 'best fit' | 'basic' | undefined;
	hour12?: boolean | undefined;
	timeZone?: string | undefined;
}

const formatDate = (date: Date): string => {
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	} as DateTimeFormatOptions;
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	const dayOfWeekOptions = { weekday: 'long' } as DateTimeFormatOptions;
	const dayOfWeek = new Intl.DateTimeFormat('en-US', dayOfWeekOptions).format(
		date
	);

	return `${formattedDate} | ${dayOfWeek}`;
};

const formatTime = (date: Date): string => {
	const options = {
		hour: 'numeric',
		minute: 'numeric',
		// second: 'numeric',
	} as DateTimeFormatOptions;
	return new Intl.DateTimeFormat('en-US', options).format(date);
};

const CurrentTimeDisplay: React.FC = () => {
	const [currentTime, setCurrentTime] = useState<Date>(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000); // Update every second

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div>
			<p>{formatTime(currentTime)}</p>
		</div>
	);
};

export default CurrentTimeDisplay;
