import { cookies } from 'next/headers'

import { cache } from 'react'

import { Database } from '@/lib/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies }),
)

export async function getSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single()
    return userDetails
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
