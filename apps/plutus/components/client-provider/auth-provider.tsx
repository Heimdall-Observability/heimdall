'use client'

import { useRouter } from 'next/navigation'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { Database } from '@/lib/database.types'
import fetcher from '@/lib/fetcher'
import {
  SupabaseClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { SWRConfig } from 'swr'

interface User {
  currency: string
  locale: string
  billing_start_date: string
  trial_start_date: string
  order_status: string
  usage: number
  email: string
  plan_status: string
  new_signup_email: boolean
  basic_usage_limit_email: boolean
  premium_plan_expired_email: boolean
  premium_usage_limit_email: boolean
  monthly_email_report: boolean
  isPremium: boolean
  isPremiumPlanEnded: boolean
}

interface Session {}

type SupabaseContext = {
  supabase: SupabaseClient<Database>
}

const AuthContext = createContext<SupabaseContext | undefined>(undefined)

export const AuthProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { user, children, ...others } = props

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        router.refresh()
      }

      if (event === 'SIGNED_OUT') {
        window.location.href = '/'
      }

      setSession(currentSession)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const value = useMemo(() => {
    return {
      session,
      user,
      signOut: () => supabase.auth.signOut(),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, user])

  return (
    <AuthContext.Provider value={value} {...others}>
      <SWRConfig value={{ fetcher }}>{session ? children : null}</SWRConfig>
    </AuthContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext<any>(AuthContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthContext.`)
  }
  return context?.user ?? null
}
