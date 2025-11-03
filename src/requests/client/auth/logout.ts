type LogoutRequest = () => Promise<boolean>

export const authLogout: LogoutRequest = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const auth = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    if (auth.error) {
      throw Error('Não foi possivel completar atualizar suas credenciais')
    }

    return true
  } catch (_err) {
    return false
  }
}
