import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { UserAuthData } from '@/types/apiResponses'
import { isTokenValid } from '@/utils/auth/token'

export async function GET() {
  const reqCookies = cookies()

  const authenticatedUser = reqCookies.get(appCookies.auth)

  if (!authenticatedUser) {
    return NextResponse.json({ user: undefined }, { status: 200 })
  }

  const authCookie = JSON.parse(authenticatedUser.value) as UserAuthData

  const authIsValid = isTokenValid(authCookie.expireAt)

  if (!authIsValid) {
    return NextResponse.json({ user: undefined }, { status: 200 })
  }

  return NextResponse.json({ user: authCookie.user }, { status: 200 })
}
