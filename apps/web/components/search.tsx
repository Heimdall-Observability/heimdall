'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { IconSearch, Input } from '@heimdall-logs/ui'

export default function Search({ disabled }: { disabled?: boolean }) {
  const [filterString, setFilterString] = useState('')
  const { replace } = useRouter()
  const pathname = usePathname()
  const [_isPending, startTransition] = useTransition()

  function handleSearch(term: string) {
    setFilterString(term)
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <Input
      size="small"
      type="text"
      name="search"
      id="search"
      disabled={disabled}
      value={filterString}
      className="w-64"
      // className='block h-10 rounded-md bg-background pl-0 shadow-none sm:text-sm'
      placeholder="Search for a site"
      spellCheck={false}
      onChange={(e) => handleSearch(e.target.value)}
      icon={<IconSearch size="tiny" />}
    />
  )
}
