import { NextRequest, NextResponse } from 'next/server'

import messages, { emails } from '@/constants/messages'
import SignUpEmail from '@/emails/signup'
import { env } from '@/env.mjs'
import { Database } from '@/lib/database.types'
import resend from '@/lib/email'
import { getRedirectUrl } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
)

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  const user = await prisma.users.findFirst({
    where: { email },
    select: { email: true },
  })

  console.log('Class: POST, Function: POST, Line 27 user():', user)

  if (!user) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: getRedirectUrl() },
      })

      if (error) {
        throw error
      }

      const { properties } = data
      const { action_link } = properties

      try {
        await resend.emails.send({
          from: emails.from,
          subject: emails.register.subject,
          to: email,
          react: SignUpEmail({ action_link }),
        })
        return NextResponse.json({ message: emails.sent })
      } catch (err: any) {
        throw err
      }
    } catch (error: any) {
      return NextResponse.json(
        { message: String(error) || messages.error },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json(
      { message: messages.account.exist },
      { status: 500 },
    )
  }
}
