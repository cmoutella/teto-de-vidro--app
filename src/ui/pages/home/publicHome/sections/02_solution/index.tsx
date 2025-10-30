import Icon from '@/ui/components/base/Icon'
import OptimizedImage from '@/ui/components/base/image'

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
    <section className="w-full flex justify-center bg-brand-primary-600 py-10 sm:py-14 lg:py-20 text-white px-7 sm:px-14 md:px-20">
      <div className="container max-w-[1240px] lg:px-10">
        <h3 className="text-xl md:text-xl md:font-light tracking-[0.15em] mb-10 md:mb-10 w-full">
          A facilidade que faltava
        </h3>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 sm:gap-6 lg:gap-10">
          <div className="lg:w-1/2 max-w-md">
            {CONTENT.map((ctnt, i) => {
              return (
                <div key={`solution-description-${i}`} className="w-full flex">
                  <Icon
                    icon="chevron-double-right"
                    size="2xl"
                    className="hidden md:block mr-1.5 h-[38px] -translate-y-1"
                  />
                  <div className="mb-10 sm:mb-12">
                    <h4 className="text-lg md:text-xl mb-4 font-medium md:font-semibold tracking-wide underline-offset-2">
                      {ctnt.title}
                    </h4>
                    <p className="text-base font-light">{ctnt.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="lg:w-1/2">
            <OptimizedImage
              images={{
                mobile: {
                  src: productMockUpImage,
                  height: 400
                },
                desktop: {
                  src: productMockUpImage,
                  height: 450
                }
              }}
              alt="Imagem ilustrativa do produto apresentado"
              className="h-auto translate-x-5 md:translate-x-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
