import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { AdScrapedData } from '@/types/scraper'
import { getAppAuth } from '@/utils/auth/getAppAuth'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.url) {
    return NextResponse.json({ error: 'A url deve ser enviada no body' }, { status: 400 })
  }

  const baseUrl = process.env.BACKEND_API

  if (!baseUrl) throw new Error('BACKEND_API url not defined')

  const userAuth = isUserAuthenticated()
  const reqCookies = cookies()

  try {
    if (!userAuth) {
      throw new Error('Usuário não autenticado')
    }

    const appAuth = await getAppAuth()

    if (!appAuth || !appAuth.token) {
      throw new Error('Application auth failed')
    } else {
      reqCookies.set(appCookies.app, JSON.stringify(appAuth), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 3,
        domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidro.app.br'
      })
    }

    const res = await fetch(`${baseUrl}/scraper?url=${body.url}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appAuth.token,
        Authorization: `Bearer ${userAuth.token}`
      }
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível buscar os dados do anúncio')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error(response.error)
    }

    const { data } = response as SuccessResponse<AdScrapedData>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
