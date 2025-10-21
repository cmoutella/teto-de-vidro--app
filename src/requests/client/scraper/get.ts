import type { SuccessResponse } from '@/types/apiPatterns'
import type { AdScrapedData } from '@/types/scraper'

export type ScraperRequestProps = { url: string }

export const scraper = async (bodyData: ScraperRequestProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APPLICATION_URL

  if (!baseUrl) throw new Error('Application APP url not defined')

  try {
    const res = await fetch(`${baseUrl}/api/scraper`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then((res) => res.json())

    if (!res || res.error) {
      throw Error('O serviço scraper não está disponível')
    }

    const { data } = res as SuccessResponse<AdScrapedData>

    return data.data
  } catch (_err) {
    return undefined
  }
}
