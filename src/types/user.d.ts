export type Gender = 'male' | 'female' | 'neutral'
export type UserRole = 'beta' | 'guest' | 'regular' | 'tester' | 'admin' | 'master'

export interface UserPermissions {
  activeHuntsLimit: number
  invitationsLimit: number
  targetsPerHuntLimit: number
}
export interface InterfaceUser {
  id: string
  name: string
  familyName: string
  cpf: string
  accessLevel: string
  role: UserRole
  password: string
  profession?: string
  gender: Gender
  birthDate: string
  email: string
  lastLogin: string
  permissions?: UserPermissions
}

export type SessionUser = Omit<InterfaceUser, 'password'> | undefined
