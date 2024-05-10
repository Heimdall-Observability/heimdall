import WebsiteNav from '@/components/layout/website-nav'
import { WEBSITE_NAMES } from '@/types/website'
import { ReactNode } from 'react'

interface Props {
  params: {
    id: string
  }
  children: ReactNode
}

export default function Layout({ children, params }: Props) {
  return (
    <>
      <WebsiteNav activePage={WEBSITE_NAMES.ANALYTICS} id={params.id} />
      {children}
    </>
  )
}
