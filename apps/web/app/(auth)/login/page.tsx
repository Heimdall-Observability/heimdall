import { signIn } from '@/auth'
import { BackLink } from '@/components/arrow-button'

import { cn } from '@/lib/utils'
import loginStyles from '@/styles/login.module.css'
import { Button, Icons } from '@heimdall-logs/ui'
import { Suspense } from 'react'
import { z } from 'zod'

const searchParamsSchema = z.object({
  redirectTo: z.string().optional().default('/app'),
})

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = searchParamsSchema.safeParse(searchParams)
  const redirectTo = search.success ? search.data.redirectTo : '/dashboard'

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className={loginStyles.main} />
      <BackLink className="absolute left-8 top-8 hidden md:flex" to="/">
        back to home
      </BackLink>
      <div className="hidden md:block lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col items-center text-center">
            <Icons.logo className="mx-auto h-14 w-14" />
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              to continue to Heimdall
            </p>
            <Suspense fallback={<div>Loading...</div>}>
              <div className={cn('grid gap-4 mt-12 w-[400px]')}>
                <form>
                  <Button
                    size="large"
                    type="alternative"
                    className="w-full"
                    htmlType="submit"
                    // icon={<GitHubLogoIcon className="mr-2 h-4 w-4" />}
                    formAction={async () => {
                      'use server'
                      await signIn('github', {
                        callbackUrl: redirectTo,
                      })
                    }}
                  >
                    Github
                  </Button>
                </form>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
