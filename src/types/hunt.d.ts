export type CONTRACT_TYPE = 'buy' | 'rent' | 'either'

export type HuntParticipant = {
  id: string
  name: string
  status: 'waiting' | 'accepted'
}

export interface InterfaceHunt {
  id: string
  creatorId: string
  huntUsers: HuntParticipant[]
  title?: string
  type: CONTRACT_TYPE
  movingExpected?: string
  isActive?: boolean
  livingPeople?: number
  livingPets?: number
  targets: string[]
  minBudget: number
  maxBudget: number
}

export interface HuntPermissions {
  maxTargets: number
}

export type AmenityOf = 'lot' | 'property'
export interface AmenityData {
  identifier: string
  label?: string
  amenityOf?: AmenityOf
}
