export const formatEmailInput = (inValue: string) => {
  return inValue.replace(/[^a-zA-Z0-9@._-]/g, '')
}
