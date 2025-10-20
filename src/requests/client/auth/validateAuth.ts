import type { InterfaceUser } from '@/types/user'

export async function validateAuthentication() {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  try {
    const response = await fetch(`${baseUrl}/api/auth/validate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      throw new Error('Não foi possível confirmar as credenciais')
    }

    const data = await response.json()

    return data.user as Omit<InterfaceUser, 'password'>
  } catch {
    return
  }
}
