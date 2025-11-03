import { useMemo } from 'react'

export function useAddressString(data: {
  street?: string
  lotNumber?: string
  block?: string
  propertyNumber?: string
  city?: string
  uf?: string
}) {
  return useMemo(() => {
    if (!data.street) return 'Complete as informações de endereço'

    const complementAddress =
      data.propertyNumber && data.propertyNumber !== '0'
        ? `,  ${data.block && data.block !== '0' ? `Bl ${data.block}` : ''}${data.propertyNumber}`
        : ''
    const baseAddress = `${data.street ?? '?'}${data.lotNumber && data.lotNumber !== '0' ? `, ${data.lotNumber}` : ''}${complementAddress}`
    const locationAddress = ` - ${data.city ?? '?'},  ${data.uf ?? '?'}`
    return `${baseAddress}${locationAddress}`
  }, [data])
}
