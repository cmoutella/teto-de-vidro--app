import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'
import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.targetId) {
    return NextResponse.json({ error: 'Dados insuficiêntes.' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  const authCookie = req.cookies.get(appCokies.auth)?.value
  const tokenFromCookie = authCookie ? JSON.parse(authCookie).token : undefined

  const authorization =
    req.headers.get('authorization') ?? (tokenFromCookie && `Bearer ${tokenFromCookie}`)

  try {
    const res = await fetch(`${baseUrl}/target-property/${body.targetId}/amenity`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {})
      },
      body: JSON.stringify(body.amenity)
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Erro ao executar')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel adicionar essa amenity do target agora')
    }

    const { data } = response as SuccessResponse<PaginatedData<TargetPropertyInterface>>

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
