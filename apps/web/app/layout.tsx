import type { ReactNode } from 'react'

import { ClientProvider } from '@/components/client-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/toaster'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@/lib/utils'
import '@/styles/globals.css'
// import Heimdall from '@heimdall-logs/tracker/react'

import { constructMetadata } from '@/lib/construct-metadata'
import { OpenStatusProvider } from '@openstatus/next-monitoring'
// import '@/styles/syntax-highlighter.module.css';
import Analytics from '../components/analytics'

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-[100dvh] overscroll-none whitespace-pre-line bg-background font-sans text-foreground antialiased',
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <OpenStatusProvider dsn="heimdall" />
        <ClientProvider>
          {children}
          <Toaster />
          <Analytics />
          <TailwindIndicator />
        </ClientProvider>
      </body>
    </html>
  )
}
