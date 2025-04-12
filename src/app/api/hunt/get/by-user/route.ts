import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'
import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.userId) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para buscar pelas hunts' },
      { status: 400 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  const cookieToken = req.cookies.get(appCokies.auth)?.value

  try {
    const res = await fetch(
      `${baseUrl}/hunt/search/${body.userId}?page=${body.page}&limit=${body.perPage}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          ...(cookieToken ? { Authorization: `Bearer ${JSON.parse(cookieToken).token}` } : {})
        }
      }
    ).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possivel buscar as hunts do usuário')
    }

    const { data } = res as SuccessResponse<PaginatedData<InterfaceHunt>>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno do servidor', details: err }, { status: 500 })
  }
}
