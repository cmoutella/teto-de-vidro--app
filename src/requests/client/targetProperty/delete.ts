import type { TargetPropertyInterface } from '@/types/targetProperty'

export type EditHuntRequestProps = Omit<TargetPropertyInterface, 'id' | 'targets'>

type DeleteTargetRequest = (_id: string) => Promise<boolean | undefined>

export const deleteTargetProperty: DeleteTargetRequest = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res: Response = await fetch(`${baseUrl}/api/target-property/delete`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })

    if (!res || res.error) {
      throw Error('Não foi possível criar agora, tente novamente mais tarde')
    }

    return res.status === 200
  } catch (_err) {
    return undefined
  }
}
