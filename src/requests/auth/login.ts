import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserAuth } from '@/types/apiResponses'

type LoginRequest = (_email: string, _password: string) => Promise<UserAuth | undefined>

export const authLogin: LoginRequest = async (email, password) => {
  // devemos esconder a senha na request e passar aplicando o SECRET?
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) return undefined

  const loginUrl = `${baseUrl}/users/login`
  const credentials = { email: email, password: password }

  try {
    const auth = await fetch(loginUrl, {
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
