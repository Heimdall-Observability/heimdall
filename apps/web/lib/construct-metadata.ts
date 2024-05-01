import type { Metadata } from 'next'

const HOME_DOMAIN = 'https://heimdall-logs.vercel.app'

export function constructMetadata({
  title = 'Heimdall',
  description = 'Monitor your app performance.',
  image = '/thumbnail.png',
  icons = [
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
  ],
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: Metadata['icons']
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@mashafrancis',
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    keywords: [
      'Monitoring',
      'Open Source app analytics',
      'safaricom',
      'safaricom observability',
    ],
  }
}
