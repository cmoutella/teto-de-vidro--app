/**
 * GET USER PERMISSIONS
 * @returns UserPermissions
 */

import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

import { appCookies } from '@/config/cookies'
import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceUser } from '@/types/user'
import { getAppAuth } from '@/utils/auth/getAppAuth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const baseUrl = process.env.BACKEND_API

  if (!baseUrl) throw new Error('Application API url not defined')

  try {
    const auth = await getAppAuth()

    if (!auth || !auth.token) {
      throw new Error('Erro de autorização')
    } else {
      const reqCookies = cookies()
      reqCookies.set(appCookies.app, JSON.stringify(auth), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 3,
        domain: process.env.NODE_ENV !== 'production' ? 'localhost' : 'tetodevidro.app.br'
      })
    }

    const body = await req.json()

    const response = await fetch(`${baseUrl}/users/${params.id}/initial-update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': auth.token
      },
      body: JSON.stringify(body)
    })

    if (response.status === 401) {
      throw new Error('Erro de autorização')
    } else if (response.status >= 500) {
      throw new Error('Erro interno no servidor')
    } else if (response.status >= 400) {
      throw new Error('Não foi possível buscar agora')
    }

    const responseData = await response.json()

    if (responseData.error) {
      console.error(`# Initial Setup Req - ERROR - ${responseData.error}`)
      throw new Error('Não foi possivel atualizar os dados agora')
    }

    const { data } = responseData as SuccessResponse<InterfaceUser>

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
