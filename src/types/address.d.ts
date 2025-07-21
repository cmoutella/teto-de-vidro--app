export type SUN_LIGHT = 'morning' | 'afternoon' | 'none'

export interface InterfaceProperty {
  id: string
  mainAddressId: string
  block?: string
  propertyNumber: string
  size?: number
  rooms?: number
  bathrooms?: number
  parking?: number
  is_front?: boolean
  sun?: SUN_LIGHT
  condoPricing?: number
  propertyConvenience: string[]
}

type PropertyDataProps = Omit<InterfaceProperty, 'id'>

export interface InterfaceLot {
  id: string
  name?: string
  street: string
  lotNumber: string
  postalCode?: string
  neighborhood?: string
  city: string
  province: string
  country: string
  lotConvenience?: string[]
}

type LotDataProps = Omit<InterfaceLot, 'id'>

export interface InterfaceAddress extends PropertyDataProps, LotDataProps {}
