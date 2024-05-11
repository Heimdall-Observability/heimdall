import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/login',
    'expenses',
    'income',
    'investments',
    'subscriptions',
  ].map((route) => ({
    url: `https://plutus.francismasha.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
