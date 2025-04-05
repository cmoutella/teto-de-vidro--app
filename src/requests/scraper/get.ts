import type { AdScrapedData } from '@/services/web-scraper/shared/type'
import type { SuccessResponse } from '@/types/apiPatterns'

export type ScraperRequestProps = { url: string }

type ScraperRequest = (_bodyData: ScraperRequestProps) => Promise<AdScrapedData | undefined>

export const scraper: ScraperRequest = async (bodyData) => {
  const baseUrl = 'http://localhost:3000'

  if (!baseUrl) return undefined

  try {
    const res = await fetch(`${baseUrl}/api/scraper`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then((res) => res.json())

    if (res.error) {
      throw Error('O serviço scraper não está disponível')
    }

    const { data } = res as SuccessResponse<AdScrapedData>

    return data
  } catch (_err) {
    return undefined
  }
}
