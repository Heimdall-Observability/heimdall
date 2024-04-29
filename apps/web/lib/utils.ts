import { env } from '@/env.mjs';
import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Locks the scroll of the document by adding a 'lock-scroll' class to the html element.
 * The 'lock-scroll' class should be defined in a global stylesheet and contain styles for disabling scrolling.
 */
export function lockScroll() {
	const root = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
	root.classList.toggle('lock-scroll'); // class is define in the global.css
}

/**
 * Removes the scroll lock from the document by removing the 'lock-scroll' class from the html element.
 */
export function removeScrollLock() {
	const root = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
	root.classList.remove('lock-scroll'); // class is define in the global.css
}

export function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
    hour: 'numeric',
	});
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function absoluteUrl(path: string) {
	return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function nFormatter(num?: number, digits?: number) {
	if (!num) return '0';
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	const item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value;
		});
	return item
		? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol
		: '0';
}

export const truncate = (str: string | null, length: number) => {
	if (!str || str.length <= length) return str;
	return `${str.slice(0, length - 3)}...`;
};

export const getHost = (url: string) => {
	return new URL(url).hostname.match(/[^.]+\.[^.]+$/)?.[0];
};

export function isURLImage(url: string, callback: (state: boolean) => void) {
	const img = new Image();
	img.onload = function () {
		callback(true);
	};
	img.onerror = function () {
		callback(false);
	};
	img.src = url;
}

export function getHostName(url: string) {
	const match = url.match(
		/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
	);
	return match && match.length > 1 ? match[1] : null;
}

export function guid(): string {
	let d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
}

export function fancyId() {
	return Math.random().toString(36).substr(2, 9);
}

// Grab favicon from a URL
// use fetch to grag from `https://favicon-fetcher.victr.workers.dev/${url}`
export async function getFavicon(url: string) {
	const response = await fetcher(
		`https://favicon-fetcher.victr.workers.dev/${url}`
	);
	return response;
}

// function to convert OpenTelemetry Duration to readable units and retain decimal precision and remove trailing zeros
export function durationToReadableUnits(duration: number) {
	const units = ['ns', 'μs', 'ms', 's'];
	let unitIndex = 0;
	let convertedDuration = duration;
	while (convertedDuration >= 1000 && unitIndex < units.length - 1) {
		convertedDuration /= 1000;
		unitIndex++;
	}
	return `${convertedDuration.toFixed(2).replace(/\.?0+$/, '')} ${
		units[unitIndex]
	}`;
}
