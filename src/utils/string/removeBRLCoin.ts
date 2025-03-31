export function removeBrl(val: string) {
  const onlyNum = val.replace('R$', '').trim()

  return onlyNum.replaceAll('.', '').trim()
}
