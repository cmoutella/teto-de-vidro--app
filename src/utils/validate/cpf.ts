import { normalizeCpf } from '../string/normalize/normalizeCPF'

export function isValidCPF(cpf: string) {
  if (!cpf) return false

  const normalizedCPF = normalizeCpf(cpf) // Remove caracteres não numéricos
  if (!normalizedCPF || /^(\d)\1+$/.test(normalizedCPF)) return false

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(normalizedCPF.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(normalizedCPF.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(normalizedCPF.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(normalizedCPF.substring(10, 11))) return false

  return true
}
