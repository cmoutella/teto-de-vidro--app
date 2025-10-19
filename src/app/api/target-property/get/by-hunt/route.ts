import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { PaginatedData, SuccessResponse } from '@/types/apiPatterns'
import type { TargetPropertyInterface } from '@/types/targetProperty'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.huntId) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para buscar os targets da hunt' },
      { status: 400 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  const authCookie = req.cookies.get(appCookies.auth)?.value
  const tokenFromCookie = authCookie ? JSON.parse(authCookie).token : undefined

  const authorization =
    req.headers.get('authorization') ?? (tokenFromCookie && `Bearer ${tokenFromCookie}`)

  try {
    const res = await fetch(
      `${baseUrl}/target-property/search/${body.huntId}?page=${body.page}&limit=${body.perPage}`,
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
      throw new Error('Não foi possível trazer sua busca agora')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel buscar os targets dessa hunt agora')
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
