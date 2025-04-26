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

  isActive: boolean
  huntingStage: PropertyHuntingStage
  priority: number
  visitDate: string

  // contact
  realState?: string
  realStatePhoneNumber?: string
  contactName?: string
  contactWhatzap?: string

  // lot
  lotId: string
  noLotNumber: boolean
  lotNumber: string
  postalCode: string
  neighborhood: string
  uf: string
  city: string
  country: string
  street: string

  // property
  propertyId: string
  noComplement: boolean
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
