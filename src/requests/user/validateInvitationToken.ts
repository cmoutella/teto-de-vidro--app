import type { SuccessResponse } from '@/types/apiPatterns'

type ResponseExpected = {
  invitationId: string
  welcomeCompleted: false
  user: {
    name: string
    id: string
  }
}

type GetUserRequest = (_token: string) => Promise<ResponseExpected | undefined>

// TODO: not public NEXT_PUBLIC_BASE_APP_KEY

export const validateInvitationToken: GetUserRequest = async (token) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const appToken = process.env.NEXT_PUBLIC_BASE_APP_KEY

  if (!baseUrl) throw new Error('Application API url not defined')

  const validationUrl = `${baseUrl}/users/validate-invite/${token}`

  try {
    const user = await fetch(validationUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken}`
      }
    }).then((res) => res.json())

    if (user.error) {
      throw Error('Convite não encontrado ou expirado')
    }

    const { data } = user as SuccessResponse<ResponseExpected>

    return data
  } catch (_err) {
    return undefined
  }
}
