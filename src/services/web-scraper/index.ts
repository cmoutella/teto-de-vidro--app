import puppeteer from 'puppeteer'

import { extractAddress } from '@/utils/address/extractAddressData'
import { removeBrl } from '@/utils/string/removeBRLCoin'

import { sanitizeZap } from './vendors/zapimoveis'

export async function webScraper(url: string) {
  const host = new URL(url).hostname

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list'
    ]
  })
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.setViewport({ width: 1080, height: 1024 })

  async function scrapeZap() {
    const adData: Record<string, string | string[] | number | boolean> = {}

    /**
     * PREÇO DE
     * VENDA OU ALUGUEL
     */
    const propertyValuesTypes = await page.$$eval(
      '.price-value-wrapper #business-type-info',
      (elements) => elements.map((el) => el.textContent?.trim().toLowerCase() || '')
    )
    const propertyValues = await page.$$eval('.price-info-value', (elements) =>
      elements.map((el) => el.textContent?.split('/')[0].trim() || '')
    )

    if (propertyValuesTypes.includes('venda')) {
      const index = propertyValuesTypes.indexOf('venda')
      adData['sellPrice'] = removeBrl(propertyValues[index])
    }
    if (propertyValuesTypes.includes('aluguel')) {
      const index = propertyValuesTypes.indexOf('aluguel')
      adData['rentPrice'] = removeBrl(propertyValues[index])
    }

    /**
     * CONDOMÍNIO
     */
    const condoPricing = await page.$eval(
      '#condo-fee-price',
      (elements) => elements.textContent?.trim() || ''
    )
    if (condoPricing) {
      adData['condoPricing'] = removeBrl(condoPricing)
    }

    /**
     * IPTU
     */
    const iptuPrice = await page.$eval(
      '#iptu-price',
      (elements) => elements.textContent?.trim() || ''
    )
    if (iptuPrice) {
      adData['iptu'] = removeBrl(iptuPrice)
    }

    /**
     * CONDOMÍNIO
     */
    const amenities = await page.$$eval(
      '.amenities-container .amenities-list > .amenities-item',
      (elements) =>
        elements.map((el) => {
          return {
            label: el.getAttribute('itemprop'),
            value: Number(el.textContent?.split(' ')[0].trim()) || undefined
          }
        })
    )
    amenities.forEach((item) => {
      if (item.label && item.value) {
        adData[item.label] = item.value
      } else if (item.label) {
        adData[item.label.toLowerCase()] = true
      }
    })

    /**
     * ENDEREÇO
     */
    const address = await page.$eval(
      '.address-info-value',
      (elements) => elements.textContent?.trim() || ''
    )
    const addressData: Record<string, string | null> = extractAddress(address)

    for (const d in addressData) {
      if (addressData[d]) {
        adData[d] = addressData[d]
      }
    }

    await browser.close()

    return sanitizeZap(adData)
  }

  function getHostScraperFunction(domain: string) {
    //TODO: scrape more sites

    switch (domain) {
      case 'www.zapimoveis.com.br':
        // handle zap imoveis algorithym
        return scrapeZap
        break

      default:
        // handle default
        return () => {}
        break
    }
  }

  async function getAdData() {
    const getData = getHostScraperFunction(host)

    const scrapedData = await getData()

    return scrapedData
  }

  return { fetch: getAdData }
}
