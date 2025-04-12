import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.id) {
    return NextResponse.json(
      { error: 'Dados insuficiêntes para deletar o target' },
      { status: 400 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  const cookieToken = req.cookies.get(appCokies.auth)?.value

  try {
    const res = await fetch(`${baseUrl}/target-property/${body.id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieToken ? { Authorization: `Bearer ${JSON.parse(cookieToken).token}` } : {})
      },
      body: JSON.stringify(body)
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possivel deletar agora')
    }

    return NextResponse.json({ message: 'Target removido com sucesso' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno do servidor', details: err }, { status: 500 })
  }
}
