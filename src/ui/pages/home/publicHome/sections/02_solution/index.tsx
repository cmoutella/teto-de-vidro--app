import Image from 'next/image'

import productMockUpImage from './assets/product-mockup.png'

const CONTENT = [
  {
    title: 'Todos os imóveis que você tem interesse em um único lugar',
    description:
      'Viu em alguma plataforma e gostou? Use o link do anúncio para trazer todas as informações disponíveis.'
  },
  {
    title: 'Acompanhe cada etapa do processo',
    description:
      'Mantenha o status de cada imóvel atualizado. Saiba quem já te retornou, qual a próxima visita e os imóveis que você mais gostou.'
  },
  {
    title: 'Convide quem vai morar com você',
    description: 'Compartilhe anotações e checklists com quem está nessa busca com você.'
  }
]

export function SolutionSection() {
  return (
    <section className="w-full flex justify-center bg-brand-primary-600 py-20 text-white">
      <div className="container">
        <h3 className="text-2xl tracking-[0.15em] mb-14">A facilidade que faltava</h3>
        <div className="flex gap-10">
          <div className="w-1/2">
            {CONTENT.map((ctnt, i) => {
              return (
                <div key={`solution-description-${i}`} className="mb-10">
                  <h4 className="text-2xl mb-4 font-semibold">{ctnt.title}</h4>
                  <p className="text-xl">{ctnt.description}</p>
                </div>
              )
            })}
          </div>
          <div className="w-1/2">
            <Image
              src={productMockUpImage}
              alt="Imagem ilustrativa do produto apresentado"
              className="w-full translate-x-6"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
