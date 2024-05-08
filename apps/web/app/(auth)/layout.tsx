import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
