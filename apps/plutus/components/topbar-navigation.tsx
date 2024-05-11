import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { UserAccountNav } from '@/components/user/user-account-nav'
import { cn } from '@/lib/utils'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import plutusLogo from '../public/logo.svg'

const TopBarNavigation = async () => {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col justify-between">
      <nav className="inset-x-0 top-0 z-10 w-full p-4 lg:fixed lg:p-2 lg:px-0">
        <div className="mx-auto flex max-w-7xl justify-between">
          <div className="hidden items-center justify-center gap-2 align-middle lg:flex">
            <Image
              src={plutusLogo}
              alt="..."
              width={35}
              height={20}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 p-1 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-600"
            />
            <Link
              href="/"
              aria-label="plutus"
              className="block whitespace-nowrap font-heading text-2xl font-medium text-primary transition focus:outline-none"
            >
              Plutus.
            </Link>
          </div>

          <div className="flex items-center gap-3 text-base leading-5">
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'px-4',
                )}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default TopBarNavigation
