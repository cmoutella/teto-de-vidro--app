import OptimizedImage from '@/ui/components/base/image'

import ilustration from './assets/ilustration.png'

export function MarketGapSection() {
  return (
    <section className="w-full flex justify-center py-10 lg:py-16">
      <div className="containerpx-2 sm:px-4">
        <h3 className="text-center text-xl sm:text-3xl mb-6 sm:mb-14 px-3">
          Cansou de se perder na busca pelo imóvel ideal?
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 lg:gap-20 px-4">
          <OptimizedImage
            images={{
              mobile: {
                src: ilustration,
                height: 235
              },
              desktop: {
                src: ilustration,
                height: 325
              }
            }}
            alt="Uma pessoa com expressão confusa diante de uma tela de computador e um celular"
          />
          <ul className="text-base flex flex-col gap-3 px-2">
            <li>
              - <span className="font-semibold">Mensagens perdidas</span> no whatsapp
            </li>
            <li>
              - Planilhas no excel sem saber mais{' '}
              <span className="font-semibold">qual apartamento é qual</span>
            </li>
            <li>
              - Anotações <span className="font-semibold">espalhadas</span>
            </li>
            <li>
              - <span className="font-semibold">Qual era a imobiliária</span> mesmo?
            </li>
            <li>
              - <span className="font-semibold">Alguém já respondeu</span> sobre aquele apê maneiro?
            </li>
            <li>
              - Quais imóveis <span className="font-semibold">ainda estão no páreo?</span>
            </li>
            <li>
              - E <span className="font-semibold">o favorito</span>, qual era mesmo?
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
