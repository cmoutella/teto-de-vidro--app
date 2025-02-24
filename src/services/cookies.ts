import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export function cookie() {
  /**
   * ######################
   * # Client side cookies
   * ######################
   */
  const accessCookie = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false
    }

    return true
  }

  function getCookie(cookieName: string): string | null {
    const cookiesAvailable = accessCookie()

    if (!cookiesAvailable) return null

    const cookies = document.cookie.split('; ')

    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split('=')
      if (name === cookieName) {
        return value
      }
    }

    return null
  }

  function setCookie(
    cookieName: string,
    cookieStringValue: string,
    expirationDate: Date | undefined
  ) {
    let expires: string

    if (expirationDate) {
      expires = 'expires=' + expirationDate.toUTCString()
    } else {
      const date = new Date()
      const defaultDaysBeforeExpires = 3
      date.setTime(date.getTime() + defaultDaysBeforeExpires * 24 * 60 * 60 * 1000)

      expires = 'expires=' + date.toUTCString()
    }

    document.cookie = cookieName + '=' + cookieStringValue + ';' + expires + ';path=/'
  }

  function deleteCookie(cookieName: string) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  function hasCookie(cookieName: string): boolean {
    const cookieData = getCookie(cookieName)

    if (!cookieData) return false

    return true
  }

  function getCookieServerSide(
    cookieName: string,
    allCookies: ReadonlyRequestCookies
  ): RequestCookie | undefined {
    if (!allCookies) return

    const cookie = allCookies.get(cookieName)

    return cookie
  }

  function setCookieServerSide() {
    console.log('setCookieServerSide | not implemented')
  }

  async function parseCookie(cookie: string) {
    const decodedString: string = decodeURIComponent(cookie)

    const parsed = await JSON.parse(decodedString)
    return parsed ?? undefined
  }

  return {
    client: {
      access: accessCookie,
      get: getCookie,
      set: setCookie,
      remove: deleteCookie,
      has: hasCookie
    },
    server: {
      get: getCookieServerSide,
      set: setCookieServerSide
    },
    parse: parseCookie
  }
}
