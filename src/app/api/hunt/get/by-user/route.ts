import { NextResponse } from 'next/server'

import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

export async function POST(req: Request) {
  const body = await req.json()

  const authorization = req.headers.get('authorization')

  if (!body.userId) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para buscar pelas hunts' },
      { status: 400 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  try {
    const res = await fetch(
      `${baseUrl}/hunt/search/${body.userId}?page=${body.page}&limit=${body.perPage}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          ...(authorization ? { Authorization: authorization } : {})
        }
      }
    )

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível criar agora')
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
    console.log('vinhemo pro err')
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    } else {
      return NextResponse.json({ error: `Erro desconhecido: ${err}` }, { status: 500 })
    }
  }
}
