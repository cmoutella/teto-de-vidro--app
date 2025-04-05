import { NextResponse } from 'next/server'

import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceHunt } from '@/types/app'

export async function POST(req: Request) {
  const body = await req.json()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/target-property`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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
