import { addDays } from 'date-fns'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'

/**
 * CREATE HUNT
 * @returns hunt
 */

export async function POST() {
  const baseUrl = process.env.BACKEND_API

  if (!baseUrl) throw new Error('BACKEND_API not defined')

  const app = process.env.FRONTEND_APPLICATION_CLIENT
  const key = process.env.FRONTEND_APPLICATION_KEY

  if (!app || !key) throw new Error('Backend API credentials not defined')

  try {
    const res = await fetch(`${baseUrl}/auth/apps`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: app, password: key })
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível criar agora')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel confirmar credenciais')
    }

    const { data } = response as SuccessResponse<{ token: string }>

    const cookieData = { token: data.token, expireAt: addDays(new Date(), 3).toISOString() }

    const reqCookies = cookies()
    reqCookies.set(appCookies.app, JSON.stringify(cookieData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 3 // 3 dia,
      // domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidroo.com.br'
    })

    return NextResponse.json(
      { message: 'Applicação autenticada com sucesso', cookieData },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
      return NextResponse.json({ error: err.message })
    } else {
      return NextResponse.json({ error: `Erro desconhecido: ${err}` }, { status: 500 })
    }
  }
}
