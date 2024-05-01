// 'use client'

import RightSection from '@/app/(auth)/login/right-section'
import { BackLink } from '@/components/arrow-button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'
import { env } from '@/env.mjs'
import loginStyles from '@/styles/login.module.css'
import { Suspense } from 'react'

export default function LoginPage() {
  const active = {
    github: false,
    google: !!env.GOOGLE_CLIENT_ID,
  }

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className={loginStyles.main} />
      <RightSection activeStrategy={active} />
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
              <UserAuthForm
                activeStrategy={active}
                className="mt-12 w-[400px]"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
