/**
 * GET USER PERMISSIONS
 * @returns UserPermissions
 */

import { NextResponse, type NextRequest } from 'next/server'

import { authenticateApp } from '@/requests/server/app/authenticateApp'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceUser } from '@/types/user'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  try {
    const auth = await authenticateApp()

    if (!auth) {
      throw new Error('Erro de autorização')
    }

    const body = await req.json()

    const res = await fetch(`${baseUrl}/users/${params.id}/initial-update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': auth.token
      },
      body: JSON.stringify(body)
    })

    if (res.status === 401) {
      throw new Error('Erro de autorização')
    } else if (res.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (res.status >= 400) {
      throw new Error('Não foi possível buscar agora')
    }

    const response = await res.json()

    if (response.error) {
      console.error(`# Initial Setup Req - ERROR - ${response.error}`)
      throw new Error('Não foi possivel atualizar os dados agora')
    }

    const { data } = response as SuccessResponse<InterfaceUser>

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: data },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof Error) {
      console.error(`# ERR Initial Setup - ${err.message}`)
      return NextResponse.json({ error: err.message })
    } else {
      console.error(`# ERR Initial Setup - erro desconhecido`)
      return NextResponse.json({ error: `Erro desconhecido: ${err}` }, { status: 500 })
    }
  }
}
