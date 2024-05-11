import { ArrowIcon, Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import heroStyles from '@/styles/hero.module.css'

export const runtime = 'edge'

export default async function OnboardingPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="block h-full bg-slate-100" />
      <div className={heroStyles.main} />
      <div className="block lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col items-center text-center">
            <Icons.logo className="mx-auto h-14 w-14" />
            <h1 className="text-3xl font-bold">Plutus</h1>
            <h4 className="my-6 text-slate-500 dark:text-slate-400">
              Track and manage your expenses with ease.
            </h4>

            <form action="/auth/onboarding" method="post">
              <Button className="mt-6" size="lg">
                Welcome to plutus
                <ArrowIcon direction="right" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
