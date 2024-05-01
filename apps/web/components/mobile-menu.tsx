'use client'

import Link from 'next/link'

import { JSX, SVGProps, useEffect, useState } from 'react'

import { cn, lockScroll } from '@/lib/utils'
import styles from '@/styles/mobile-menu.module.css'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import useDelayedRender from 'use-delayed-render'

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="absolute h-7 w-7 text-muted-foreground"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrossIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="absolute h-7 w-7 text-muted-foreground"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function MobileNav({ user }: { user?: User }) {
  const [navShow, setNavShow] = useState(false)
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    navShow,
    {
      enterDelay: 20,
      exitDelay: 300,
    },
  )

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = ''
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
    lockScroll()
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="sm:hidden">
      <button
        className={cn(styles.burger, 'visible text-muted-foreground md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={onToggleNav}
      >
        <MenuIcon data-hide={navShow} />
        <CrossIcon data-hide={!navShow} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'absolute flex flex-col bg-white antialiased transition duration-500 dark:bg-gray-900',
            isMenuRendered && styles.menuRendered,
          )}
        >
          <li
            onClick={onToggleNav}
            className="border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
            style={{ transitionDelay: '150ms' }}
          >
            <Link href="/" className="flex w-auto pb-4">
              Home
            </Link>
          </li>
          <li
            onClick={onToggleNav}
            className="border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
            style={{ transitionDelay: '175ms' }}
          >
            <Link href="/" className="flex w-auto pb-4">
              Pricing
            </Link>
          </li>
          <li
            onClick={onToggleNav}
            className="border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
            style={{ transitionDelay: '200ms' }}
          >
            <Link href="/" className="flex w-auto pb-4">
              Changelog
            </Link>
          </li>
          <li
            onClick={onToggleNav}
            className="border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
            style={{ transitionDelay: '225ms' }}
          >
            <Link href="/" className="flex w-auto pb-4">
              Docs
            </Link>
          </li>

          {user ? (
            <>
              <li
                onClick={onToggleNav}
                className="border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
                style={{ transitionDelay: '255ms' }}
              >
                <Link href="/dashboard/settings" className="flex w-auto pb-4">
                  Settings
                </Link>
              </li>
              <li
                className="flex justify-between border-b border-gray-300 px-8 text-lg font-medium text-gray-900 text-muted-foreground dark:border-gray-700 dark:text-gray-100"
                style={{ transitionDelay: '300ms' }}
                onClick={(event) => {
                  event.preventDefault()
                  signOut({
                    callbackUrl: `${window.location.origin}/login`,
                  })
                }}
              >
                <p className="flex w-auto pb-4 text-foreground">Logout</p>
              </li>
            </>
          ) : (
            <li
              onClick={onToggleNav}
              className="border-b border-gray-300 px-8 text-lg font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
              style={{ transitionDelay: '400ms' }}
            >
              <Link href="/login" className="flex w-auto pb-4">
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default MobileNav
