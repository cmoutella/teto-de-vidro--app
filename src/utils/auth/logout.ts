import authStorage from '@/services/storage'

export const logout = () => {
  const storage = authStorage()

  storage.clearToken()
}
