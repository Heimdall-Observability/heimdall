import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

interface MarketingLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
