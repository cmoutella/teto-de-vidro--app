import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { UserAuthData } from '@/types/apiResponses'
import type { InterfaceHunt } from '@/types/hunt'
import { getAppAuth } from '@/utils/auth/getAppAuth'
import { isTokenValid } from '@/utils/auth/token'

/**
 * GET HUNT BY USER
 * @returns hunt[]
 */

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  const body = await req.json()
  if (!body.userId) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para buscar pelas hunts' },
      { status: 400 }
    )
  }

  let appAuth = req.headers.get('x-api-key')
  let userAuth = req.headers.get('authorization')

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
          maxAge: 60 * 60 * 24 * 3 // 3 dia,
          // domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidroo.com.br'
        })
      }
    }

    if (!userAuth) {
      const tryUserAuth = reqCookies.get(appCookies.auth)

      if (tryUserAuth) {
        const parsed = JSON.parse(tryUserAuth.value) as UserAuthData

        const valid = isTokenValid(parsed.expireAt)

        if (valid) {
          userAuth = `Bearer ${parsed.token}`
        }
      }
    }

    if (!appAuth || !userAuth) {
      throw new Error('Erro de autorização')
    }

    const res = await fetch(`${baseUrl}/hunt/search/user?page=${body.page}&limit=${body.perPage}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appAuth,
        Authorization: userAuth
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
      throw new Error('Não foi possivel buscar as hunts do usuário')
    }

    const { data } = response as SuccessResponse<PaginatedData<InterfaceHunt>>

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
