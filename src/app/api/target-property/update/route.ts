import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/hunt'

export async function PUT(req: NextRequest) {
  const body = await req.json()

  if (!body.id || !body.data) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para atualizar a hunt' },
      { status: 400 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  const authCookie = req.cookies.get(appCokies.auth)?.value
  const tokenFromCookie = authCookie ? JSON.parse(authCookie).token : undefined

  const authorization =
    req.headers.get('authorization') ?? (tokenFromCookie && `Bearer ${tokenFromCookie}`)

  try {
    const res = await fetch(`${baseUrl}/target-property/${body.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {})
      },
      body: JSON.stringify(body.data)
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status === 409) {
      const response = await res.json()

      throw new Error(response.message)
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível criar agora')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel criar agora')
    }

    const { data } = response as SuccessResponse<InterfaceHunt>

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
