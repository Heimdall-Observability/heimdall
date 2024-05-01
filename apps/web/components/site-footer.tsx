import Link from 'next/link'

import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

export function SiteFooter({ className }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('w-full', className)}>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 border-border w-full rounded-lg border px-3 py-4 md:p-6">
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-foreground font-semibold">Socials</p>
          <FooterLink href="https://francismasha.com" label="francismasha" />
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-foreground font-semibold">Community</p>
          <FooterLink href="/github" label="GitHub" external />
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-foreground font-semibold">Resources</p>
          <FooterLink href="/blog" label="Blog" />
          <FooterLink href="https://status.francismasha.com" label="Status" />
          <FooterLink href="https://docs.francismasha.com" label="Docs" />
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-foreground font-semibold">Legal</p>
          <FooterLink href="/legal/terms" label="Terms" />
          <FooterLink href="/legal/privacy" label="Privacy" />
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  label: string
  external?: boolean
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
  const isExternal = external || href.startsWith('http')

  const LinkSlot = isExternal ? 'a' : Link

  const externalProps = isExternal
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {}

  return (
    <LinkSlot
      className="text-muted-foreground hover:text-foreground inline-flex items-center underline underline-offset-4 hover:no-underline"
      href={href}
      {...externalProps}
    >
      {label}
      {isExternal ? (
        <ArrowUpRight className="ml-1 h-4 w-4 flex-shrink-0" />
      ) : null}
    </LinkSlot>
  )
}
