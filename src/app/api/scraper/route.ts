import { NextResponse } from 'next/server'

import { webScraper } from '@/services/web-scraper'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.url) {
      return NextResponse.json({ error: 'A url deve ser enviada no body' }, { status: 400 })
    }

    // Instancia o serviço com a URL fornecida
    const scraper = await webScraper(body.url)

    if (!scraper) {
      return NextResponse.json({ error: 'O serviço está indisponível' }, { status: 401 })
    }

    const pageData = await scraper.fetch()

    return NextResponse.json(
      { message: 'Serviço chamado com sucesso', data: pageData },
      { status: 200 }
    )
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
