import Image from 'next/image'

import ilustration from './assets/ilustration.png'

export function MarketGapSection() {
  return (
    <section className="w-full flex justify-center py-20">
      <div className="container">
        <h3 className="text-center text-4xl mb-14">
          Cansou de se perder na busca pelo imóvel ideal?
        </h3>
        <div className="flex items-center justify-center gap-20">
          <div>
            <Image
              src={ilustration}
              alt="Uma pessoa com expressão confusa diante de uma tela de computador e um celular"
              width={400}
            />
          </div>
          <ul className="text-xl flex flex-col gap-3">
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
