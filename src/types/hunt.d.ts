export type CONTRACT_TYPE = 'buy' | 'rent' | 'either'

export interface InterfaceHunt {
  id: string
  creatorId: string
  title?: string
  type: CONTRACT_TYPE
  movingExpected?: string
  isActive?: boolean
  livingPeople?: number
  livingPets?: number
  targets: string[]
  participants: number
  minBudget: number
  maxBudget: number
}

export interface HuntParticipant {
  name: string
  familyName: string
  id: string
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
