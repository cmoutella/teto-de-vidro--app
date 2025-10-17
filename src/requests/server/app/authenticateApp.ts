import type { SuccessResponse } from '@/types/apiPatterns'

export const authenticateApp = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  const app = process.env.FRONTEND_APPLICATION_CLIENT
  const key = process.env.FRONTEND_APPLICATION_KEY

  if (!baseUrl) throw new Error('Application API url not defined')

  const authUrl = `${baseUrl}/auth/apps`

  try {
    const user = await fetch(authUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: app, password: key })
    }).then((res) => res.json())

    if (user.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    const { data } = user as SuccessResponse<{ token: string }>

    return data
  } catch (_err) {
    return undefined
  }
}
