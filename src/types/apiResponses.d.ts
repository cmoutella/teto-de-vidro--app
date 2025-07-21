import type { InterfaceUser } from './app'

export interface UserAuthResponse {
  token: string
  expireAt: string
  user: Omit<InterfaceUser, 'password'>
}

export interface AuthData {
  token: string
  expireAt: string
  user: Omit<InterfaceUser, 'password' | 'permissions'>
}
