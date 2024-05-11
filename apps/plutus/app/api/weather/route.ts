import { NextRequest, NextResponse } from 'next/server'

import { getWeatherData } from '@/lib/utils'
import { geolocation } from '@vercel/edge'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  let location = req.nextUrl.searchParams.get('location')
  if (!location) {
    const { city } = geolocation(req)
    location = city || 'San Francisco'
  }

  const response = await getWeatherData(location)

  return NextResponse.json({
    ...response,
    infoLink: `https://weathergpt.vercel.app/${encodeURIComponent(location)}`,
  })
}
