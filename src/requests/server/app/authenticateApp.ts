import type { AppAuthData } from '@/types/apiResponses'

export const authenticateApp = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application API url not defined')

  const authUrl = `${baseUrl}/api/auth/app`

  try {
    const auth = await fetch(authUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    if (auth.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    return auth.cookieData as AppAuthData
  } catch (_err) {
    console.error('ERR @ Authenticate App')
    return undefined
  }
}
