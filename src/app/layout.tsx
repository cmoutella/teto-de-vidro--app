import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { cookies } from 'next/headers'
import './globals.css'

import { appCookies } from '@/config/cookies'
import { AllProviders } from '@/providers'
import type { UserAuthData } from '@/types/apiResponses'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Teto de Vidro',
  description: 'Sua busca por imóvel facilitada'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const shouldIndexContent = process.env.NEXT_PUBLIC_ROBOTS_INDEX === 'true'

  const env = process.env.NODE_ENV
  let user

  const reqCookies = cookies()
  const userAuthCookie = reqCookies.get(appCookies.auth)

  if (userAuthCookie) {
    const userAuthData: UserAuthData = JSON.parse(userAuthCookie.value)

    user = userAuthData.user
  }

  return (
    <html lang="pt-BR" className={`w-full h-full`}>
      <Head>
        {env === 'development' || env === 'test' || (env === 'production' && shouldIndexContent)}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <body className={`w-screen h-screen ${inter.className}`}>
        <AllProviders user={user}>{children}</AllProviders>
      </body>
    </html>
  )
}
