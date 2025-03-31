import type { AdScrapedData } from '../shared/type'

interface ZapImoveisScrapedData extends Record<string, string | string[] | number | undefined> {
  rentPrice?: number
  condoPrice?: number
  iptu?: number
  floorSize?: number
  numberOfRooms?: number
  numberOfBathroomsTotal?: number
  numberOfParkingSpaces?: number
  floorLevel?: number
  numberOfSuites?: number
  street?: string
  lotNumber?: string
  neighborhood?: string
  city?: string
  uf?: string
}

export function sanitizeZap(data: ZapImoveisScrapedData) {
  const {
    floorSize,
    numberOfRooms,
    numberOfBathroomsTotal,
    numberOfParkingSpaces,
    numberOfSuites,
    ...other
  } = data
  const sanitized: AdScrapedData = {
    size: floorSize,
    rooms: numberOfRooms,
    bathrooms: numberOfBathroomsTotal,
    parkingSpots: numberOfParkingSpaces,
    suites: numberOfSuites,
    ...other
  }

  return sanitized
}
