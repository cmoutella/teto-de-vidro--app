import type { TargetPropertyInterface } from '@/types/targetProperty'

export type EditHuntRequestProps = Omit<TargetPropertyInterface, 'id' | 'targets'>

type DeleteTargetRequest = (_id: string) => Promise<boolean>

export const deleteTargetProperty: DeleteTargetRequest = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res: Response = await fetch(`${baseUrl}/api/target-property/${id}/delete`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return res.status === 200
  } catch (_err) {
    return false
  }
}
