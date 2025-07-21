import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCokies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserPermissions } from '@/types/user'

/**
 * GET USER PERMISSIONS
 * @returns UserPermissions
 */

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  const authCookie = req.cookies.get(appCokies.auth)?.value
  const tokenFromCookie = authCookie ? JSON.parse(authCookie).token : undefined

  const authorization =
    req.headers.get('authorization') ?? (tokenFromCookie && `Bearer ${tokenFromCookie}`)

  try {
    console.log('submiting GET', params.id)
    const res = await fetch(`${baseUrl}/users/${params.id}/permissions`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {})
      }
    })

    console.log('server side', res.status)

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível buscar agora')
    }

    const response = await res.json()

    if (response.error) {
      throw new Error('Não foi possivel criar agora')
    }

    const { data } = response as SuccessResponse<UserPermissions>

    console.log('route', data)

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
