import type { InterfacePublicUser } from './user'

export interface UserAuthResponse {
  token: string
  expireAt: string
  user: InterfacePublicUser
}

export interface UserAuthData {
  token: string
  expireAt: string
  user: InterfacePublicUser
}

export interface AppAuthData {
  token: string
  expireAt: string
}
