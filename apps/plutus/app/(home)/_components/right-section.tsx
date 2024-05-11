import dynamic from 'next/dynamic'
import Link from 'next/link'

import LoginButton from '@/app/(home)/_components/login-button'
import { ArrowIcon, Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const CurrentDateDisplay = dynamic(
  () => import('@/components/current-date-display'),
  { ssr: false },
)
const CurrentTimeDisplay = dynamic(
  () => import('@/components/current-time-display'),
  { ssr: false },
)

interface Props {
  data: {
    current: {
      temp_c: number
    }
  }
  session: any
}

export default function RightSection({ data, session }: Props) {
  return (
    <div className="absolute left-[159px] top-[30px] md:hidden">
      <div className="absolute left-0 top-0 h-14 w-48">
        <div className="absolute left-0 top-0 text-2xl font-bold text-gray-900">
          <CurrentTimeDisplay />
        </div>
        <div className="absolute left-0 top-[40px] text-xs font-medium leading-tight text-slate-500">
          <CurrentDateDisplay />
        </div>
        <div className="absolute left-[153px] top-[5px] text-xs font-semibold leading-tight text-gray-900">
          {data.current.temp_c}° C
        </div>
      </div>

      <div className="absolute left-0 top-[246px] h-52 w-48">
        <div className="absolute left-0 top-[57.60px] h-40 w-48">
          <div className="absolute left-0 top-[48px] w-48 text-sm font-medium leading-snug text-slate-500">
            Track and manage your expenses with ease. <br />
            <br />
            Join For Free.
          </div>
          <h4 className="absolute left-0 top-0 text-3xl font-bold text-gray-900">
            Plutus
          </h4>
        </div>
        <div className="absolute left-0 top-0 h-10 w-16">
          <Icons.logo className="mx-auto h-14 w-14" />
        </div>
      </div>

      <div className="absolute left-0 top-[625px] h-12 w-56">
        {session ? (
          <Link href="/app">
            <Button className="mt-6" size="lg">
              Go to app
              <ArrowIcon direction="right" />
            </Button>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  )
}
