import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserPermissions } from '@/types/user'
import { getAppAuth } from '@/utils/auth/getAppAuth'
import { isUserAuthenticated } from '@/utils/auth/userAuthenticationAtServer'

/**
 * GET USER PERMISSIONS
 * @returns UserPermissions
 */

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const baseUrl = process.env.BACKEND_API
  if (!baseUrl) throw new Error('Application API url not defined')

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
        maxAge: 60 * 60 * 24 * 3 // 3 dia,
        // domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidroo.com.br'
      })
    }

    const res = await fetch(`${baseUrl}/users/${params.id}/permissions`, {
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
      throw new Error('Não foi possível buscar agora')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel criar agora')
    }

    const { data } = response as SuccessResponse<UserPermissions>

    console.log('route', data)

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
