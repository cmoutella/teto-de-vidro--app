import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import { getAppAuth } from '@/utils/auth/getAppAuth'

/**
 * WAKEUP BACKEND
 * @returns boolean
 */

export async function GET(req: NextRequest) {
  const baseUrl = process.env.BACKEND_API

  if (!baseUrl) throw new Error('Application API url not defined')

  let appAuth = req.headers.get('x-api-key')

  const reqCookies = cookies()

  try {
    if (!appAuth) {
      const tryAppAuth = await getAppAuth()

      if (tryAppAuth) {
        appAuth = tryAppAuth.token

        reqCookies.set(appCookies.app, JSON.stringify(tryAppAuth), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 3
          // domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidro.app.br'
        })
      }
    }

    if (!appAuth) {
      throw new Error('Erro de autorização')
    }

    const res = await fetch(`${baseUrl}/wakeup`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appAuth
      }
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível buscar agora')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel criar agora')
    }

    const { data } = response as SuccessResponse<{ message: string; success: boolean }>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message })
    } else {
      return NextResponse.json({ error: `Erro desconhecido: ${err}` }, { status: 500 })
    }
  }
}
