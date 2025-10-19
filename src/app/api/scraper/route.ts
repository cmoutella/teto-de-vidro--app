import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { AdScrapedData } from '@/types/scraper'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.url) {
    return NextResponse.json({ error: 'A url deve ser enviada no body' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  const authCookie = req.cookies.get(appCookies.auth)?.value
  const tokenFromCookie = authCookie ? JSON.parse(authCookie).token : undefined

  const authorization =
    req.headers.get('authorization') ?? (tokenFromCookie && `Bearer ${tokenFromCookie}`)

  if (!baseUrl) throw new Error('Application API url not defined')

  try {
    const res = await fetch(`${baseUrl}/scraper?url=${body.url}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {})
      }
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível buscar os dados do anúncio')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error(response.error)
    }

    const { data } = response as SuccessResponse<AdScrapedData>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
