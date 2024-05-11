import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getWeatherData(location: string) {
  return fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json())
}

export function isMobileView() {
  return window.innerWidth <= 768
}

export function fancyId() {
  return Math.random().toString(36).substr(2, 9)
}
