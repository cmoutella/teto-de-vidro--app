import type { SuccessResponse } from '@/types/apiPatterns'
import type { UserInvitationData } from '@/types/invitation'

export type InviteUsersRequest = (_huntId: string, _bodyData: UserInvitationData[]) => Promise<void>

export async function inviteUsers(huntId: string, list: UserInvitationData[]) {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(`${baseUrl}/api/hunt/${huntId}/invite`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usersInvited: list })
    }).then((res) => res.json())

    console.log('res', res)

    if (res.error) {
      throw Error('Não foi possível convidar agora')
    }

    const { data } = res as SuccessResponse<undefined>

    return data
  } catch (_err) {
    return undefined
  }
}
