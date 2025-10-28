import { useMemo } from 'react'

import type { CONTRACT_TYPE } from '@/types/hunt'
import { formatMoneyValue } from '@/utils/string/format/formatMoney'

export function usePriceString(data: {
  rentPrice?: number
  sellPrice?: number
  huntSettings?: { type: CONTRACT_TYPE }
  iptu?: number
  condoPricing?: number
}) {
  return useMemo(() => {
    if ((!data.rentPrice && !data.sellPrice) || !data.huntSettings) {
      return 'Insira os valores para este imóvel'
    }

    if (data.huntSettings.type === 'buy') {
      if (!data.sellPrice) {
        return 'Insira o valor de compra para este imóvel'
      }

      return `Venda: ${formatMoneyValue(data.sellPrice.toString())} | Gastos mensais: ${formatMoneyValue((Number(data.condoPricing) + Number(data.iptu)).toString())}`
    } else if (data.huntSettings.type === 'rent') {
      if (!data.rentPrice) {
        return 'Insira o valor de aluguel para este imóvel'
      }

      return `Aluguel: ${formatMoneyValue(data.rentPrice.toString())} | Total mensal: ${formatMoneyValue((Number(data.rentPrice) + Number(data.condoPricing) + Number(data.iptu)).toString())}`
    }
  }, [data])
}
