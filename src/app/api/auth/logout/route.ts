import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'

export async function GET() {
  const reqCookies = cookies()

  reqCookies.delete(appCookies.auth)

  return NextResponse.json({ message: 'Logout success' }, { status: 200 })
}
