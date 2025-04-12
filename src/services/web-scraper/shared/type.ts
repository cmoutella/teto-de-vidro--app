export interface AdScrapedData extends Record<string, string | string[] | number | undefined> {
  rentPrice?: number
  condoPricing?: number
  iptu?: number
  size?: number
  rooms?: number
  bathrooms?: number
  parkingSpots?: number
  floorLevel?: number
  suites?: number
  street?: string
  lotNumber?: string
  neighborhood?: string
  city?: string
  uf?: string
}
