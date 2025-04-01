import type { TargetPropertyInterface } from '@/types/targetProperty'

export type EditHuntRequestProps = Omit<TargetPropertyInterface, 'id' | 'targets'>

type EditHuntRequest = (_id: string) => Promise<boolean | undefined>

export const deleteTargetProperty: EditHuntRequest = async (id) => {
  const baseUrl = 'http://localhost:3000'

  if (!baseUrl) return undefined

  try {
    const res: Response = await fetch(`${baseUrl}/api/target-property/delete`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possível criar agora, tente novamente mais tarde')
    }

    return res.status === 200
  } catch (_err) {
    // TODO: toast
    return undefined
  }
}
