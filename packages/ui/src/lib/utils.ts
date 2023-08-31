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
