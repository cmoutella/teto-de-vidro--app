export type PropertyHuntingStage =
  | 'new'
  | 'iniciated'
  | 'returned'
  | 'disappeared'
  | 'unavailable'
  | 'scheduled'
  | 'visited'
  | 'quit'
  | 'submitted'
  | 'approved'
  | 'denied'

interface TargetPropertyInterface {
  id: string

  createdAt: string
  updatedAt: string

  huntId: string
  adURL: string
  nickname: string
  sellPrice: number
  rentPrice: number
  iptu: number
  priority: number
  huntingStage: PropertyHuntingStage
  isActive: boolean
  visitDate: string
  realtor: string
  realtorContact: string

  lotId: string
  lotNumber: string
  postalCode: string
  neighborhood: string
  uf: string
  city: string
  country: string
  street: string

  propertyId: string
  block: string
  propertyNumber: string
  size: number
  rooms: number
  bathrooms: number
  parking: number
  is_front: boolean
  sun: string
  condoPricing: number
  convenience: string[]
}
