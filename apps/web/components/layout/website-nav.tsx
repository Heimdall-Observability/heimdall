import Link from 'next/link'

import SectionContainer from '@/components/layout/section-container'
import website from '@/data/websites'
import { cn } from '@/lib/utils'
import { WEBSITE_NAMES } from '@/types/website'

interface Props {
  activePage: WEBSITE_NAMES
  id: string
}

export default function WebsiteNav({ activePage, id }: Props) {
  return (
    <nav className="relative z-20 hidden md:flex items-center bg-background w-full border-b">
      <SectionContainer className="!py-0 flex gap-3 items-center">
        {Object.entries(website).map((obj: any) => {
          const site = obj[1]

          return (
            <Link
              key={site.name}
              className={cn(
                'flex items-center gap-1.5 px-2 first:-ml-2 py-4 border-b border-transparent text-sm text-muted-foreground hover:text-foreground',
                'focus-visible:ring-2 focus-visible:ring-muted-foreground focus-visible:text-foreground focus-visible:outline-primary/60',
                site.name === activePage &&
                  'border-muted-foreground text-foreground',
              )}
              href={`/dashboard/${id}/${site.name
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              <p>{site.name}</p>
            </Link>
          )
        })}
      </SectionContainer>
    </nav>
  )
}
