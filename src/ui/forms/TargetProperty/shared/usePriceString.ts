import { useMemo } from 'react'

import type { CONTRACT_TYPE } from '@/types/app'
import { formatMoneyValue } from '@/utils/string/formatMoney'

export function usePriceString(data: {
  rentPrice: number
  sellPrice: number
  huntSettings?: { type: CONTRACT_TYPE }
  iptu?: number
  condoPricing?: number
}) {
  return useMemo(() => {
    if ((!data.rentPrice && !data.sellPrice) || !data.huntSettings)
      return 'Insira os valores para este imóvel'

    if (data.huntSettings.type === 'buy') {
      return `Venda: ${formatMoneyValue(data.sellPrice.toString())} | Gastos mensais: ${formatMoneyValue((Number(data.condoPricing) + Number(data.iptu)).toString())}`
    } else {
      return `Aluguel: ${formatMoneyValue(data.rentPrice.toString())} | Total mensal: ${formatMoneyValue((Number(data.rentPrice) + Number(data.condoPricing) + Number(data.iptu)).toString())}`
    }
  }, [data])
}
