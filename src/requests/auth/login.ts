import type { SuccessResponse } from '@/types/apiPatterns'
import type { AuthData, UserAuthResponse } from '@/types/apiResponses'

type LoginRequest = (_email: string, _password: string) => Promise<AuthData | undefined>

export const authLogin: LoginRequest = async (email, password) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  const credentials = { email: email, password: password }

  try {
    const auth = await fetch(`${baseUrl}/api/auth`, {
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
