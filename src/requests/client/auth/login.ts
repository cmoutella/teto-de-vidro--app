import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserAuthData, UserAuthResponse } from '@/types/apiResponses'

type LoginRequest = (
  _email: string,
  _password: string
) => Promise<Pick<UserAuthData, 'user'> | undefined>

export const authLogin: LoginRequest = async (email, password) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  const credentials = { email: email, password: password }
  const originUrl = window.location.search

  const search: Record<string, string> = {}

  if (originUrl) {
    const searchParams = originUrl.slice(1).split('&')

    searchParams.map((item) => {
      const [attr, value] = item.split('=')

      search[attr] = value
    })
  }

  const requestUrl = new URL(`${baseUrl}/api/auth`)

  if (search && !!search['welcome-completed']) {
    const isFromWelcome = search['welcome-completed']

    requestUrl.searchParams.set('welcome-completed', isFromWelcome)
  }

  try {
    const auth = await fetch(requestUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((res) => res.json())

    if (auth.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    const { data } = auth as SuccessResponse<UserAuthResponse>

    return data
  } catch (_err) {
    return undefined
  }
}
