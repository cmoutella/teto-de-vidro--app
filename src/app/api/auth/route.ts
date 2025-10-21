import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserAuthResponse } from '@/types/apiResponses'
import { getAppAuth } from '@/utils/auth/getAppAuth'

export async function POST(req: Request) {
  const body = await req.json()
  const reqCookies = cookies()

  if (!body.password || !body.email) {
    return NextResponse.json({ error: 'E-mail ou senha estão ausentes' }, { status: 400 })
  }
  const baseUrl = process.env.BACKEND_API
  if (!baseUrl) throw new Error('Application API url not defined')

  const loginUrl = `${baseUrl}/auth/login`
  const credentials = { email: body.email, password: body.password }

  try {
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

    const auth = await fetch(loginUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appAuth.token
      },
      body: JSON.stringify(credentials)
    }).then((res) => res.json())

    if (auth.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    const { data } = auth as SuccessResponse<UserAuthResponse>

    reqCookies.set(appCookies.auth, JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 15 // 15 dias,
      // domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidroo.com.br'
    })

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: { user: data.user } },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno do servidor', details: err }, { status: 500 })
  }
}
