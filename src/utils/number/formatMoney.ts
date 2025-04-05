export function formatMoneyValue(valor: string) {
  const somenteNumeros = valor.replace(/\D/g, '')

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(Number(somenteNumeros))
}
