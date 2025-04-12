import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.id) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para buscar pela hunt' },
      { status: 400 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  const cookieToken = req.cookies.get(appCokies.auth)?.value

  try {
    const res = await fetch(`${baseUrl}/hunt/${body.id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieToken ? { Authorization: `Bearer ${JSON.parse(cookieToken).token}` } : {})
      }
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possivel criar agora')
    }

    const { data } = res as SuccessResponse<InterfaceHunt>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno do servidor', details: err }, { status: 500 })
  }
}
