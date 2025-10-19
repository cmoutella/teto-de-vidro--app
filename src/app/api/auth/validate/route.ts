import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'
import type { AuthData } from '@/types/apiResponses'
import { isTokenValid } from '@/utils/auth/token'

export async function GET() {
  const reqCookies = cookies()

  const authenticatedUser = reqCookies.get(appCokies.auth)

  if (!authenticatedUser) {
    return NextResponse.json({}, { status: 404 })
  }

  const authCookie = JSON.parse(authenticatedUser.value) as AuthData

  const authIsValid = isTokenValid(authCookie.expireAt)

  if (!authIsValid) {
    return NextResponse.json({}, { status: 404 })
  }

  return NextResponse.json({ user: authCookie.user }, { status: 200 })
}
