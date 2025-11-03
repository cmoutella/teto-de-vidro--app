export function normalizeCpf(cpf: string): string | null {
  const normalized = cpf.replace(/\D/g, '') // Remove tudo que não for número
  return normalized.length === 11 ? normalized : null // Retorna null se não tiver 11 dígitos
}
