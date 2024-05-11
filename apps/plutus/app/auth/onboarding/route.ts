import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import messages from '@/constants/messages'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from('users').insert([
      {
        id: user?.id as string,
        email: user?.email as string,
      },
    ])

    return NextResponse.redirect(`${requestUrl.origin}/app`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    })
  } catch (error) {
    return NextResponse.json(
      { error, message: messages.request.failed },
      { status: 500 },
    )
  }
}
