import { NextResponse } from 'next/server'

export function middleware() {
  const res = NextResponse.next()

  console.log('## MIDDLEWARE')

  const origins = process.env.ALLOW_ORIGINS as string

  res.headers.append('Access-Control-Allow-Origin', origins ?? '')
  res.headers.append('Access-Control-Allow-Credentials', 'true')
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/*'
}
