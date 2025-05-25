import { NextResponse } from 'next/server'

import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserAuth } from '@/types/apiResponses'

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.password || !body.email) {
    return NextResponse.json({ error: 'E-mail ou senha estão ausentes' }, { status: 400 })
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) return undefined

  const loginUrl = `${baseUrl}/auth/login`
  const credentials = { email: body.email, password: body.password }

  try {
    const auth = await fetch(loginUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((res) => res.json())

    if (auth.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    const { data } = auth as SuccessResponse<UserAuth>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno do servidor', details: err }, { status: 500 })
  }
}
