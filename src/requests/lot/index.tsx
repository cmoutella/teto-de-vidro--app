import type { SuccessResponse } from '@/types/apiPatterns'
import type { InterfaceLot } from '@/types/app'

export type GetLotsByAddressProps = {
  street: string
  city: string
  neighborhood?: string
  province: string
  country: string
  lotName?: string
  lotNumber?: string
  postalCode?: string
}

type GetAllLotsByAddressRequest = (_requestBody: GetLotsByAddressProps) => Promise<InterfaceLot[]>

export const getAllLotsByAddress: GetAllLotsByAddressRequest = async (requestBody) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) {
    throw new Error('A url base não foi definida')
  }

  const fetchUrl = `${baseUrl}/address/lots`

  const mockRequestData = {
    street: 'Rua Guaxupé',
    city: 'Rio de Janeiro',
    province: 'RJ',
    country: 'Brazil'
  }

  const requestData = requestBody ?? mockRequestData

  try {
    const res = await fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).then((res) => res.json())

    if (res.error) {
      throw Error('Não foi possivel buscar agora')
    }

    const { data } = res as SuccessResponse<InterfaceLot[]>

    return data
  } catch (_err) {
    return []
  }
}
