import type { InterfaceUser } from './user'

export interface UserAuthResponse {
  token: string
  expireAt: string
  user: Omit<InterfaceUser, 'password'>
}

export interface UserAuthData {
  token: string
  expireAt: string
  user: Omit<InterfaceUser, 'password' | 'permissions'>
}

export interface AppAuthData {
  token: string
  expireAt: string
}
