import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserAuth } from '@/types/apiResponses'

type LoginRequest = (_email: string, _password: string) => Promise<UserAuth | undefined>

export const authLogin: LoginRequest = async (email, password) => {
  const baseUrl = 'http://localhost:3000'

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

    const { data } = auth as SuccessResponse<UserAuth>

    return data
  } catch (_err) {
    return undefined
  }
}
