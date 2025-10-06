import OptimizedImage from '@/ui/components/base/image'

import heroDesktopImage from '../../assets/hero-desktop.png'
import heroLargeImage from '../../assets/hero-large.png'
import heroMobileImage from '../../assets/hero-mobile.png'

export function HeroSection() {
  return (
    <section className="flex justify-center relative w-full z-0 overflow-hidden h-[calc(100vh-60px)] sm:h-full">
      <div className="container relative px-2 sm:px-4 lg:px-14 py-12 sm:py-44 z-5">
        <div>
          <h1 className="text-center sm:text-start font-medium text-xl sm:text-3xl lg:text-4xl flex flex-col mb-5 sm:mb-10">
            <span className="sm:mb-2">
              Viemos pra{' '}
              <span className="text-2xl sm:text-[36px] lg:text-[40px] font-semibold">
                descomplicar
              </span>
            </span>
            <span>sua busca por imóvel</span>
          </h1>
          <h2 className="text-center sm:text-start text-sm sm:text-xl lg:text-[26px] flex flex-col font-medium">
            <span className="sm:mb-1">Chega de planilhas e anotações perdidas.</span>
            <span>Acompanhe cada imóvel de perto.</span>
          </h2>
        </div>
        <OptimizedImage
          images={{
            mobile: {
              src: heroMobileImage,
              height: 1000
            },
            desktop: {
              src: heroDesktopImage,
              height: 450
            },
            large: {
              src: heroLargeImage,
              height: 500
            }
          }}
          alt="Imagem decorativa de uma cidade, contém prédios, uma rua em Z e algumas árvores"
          className="absolute top-0 bottom-0 right-6 hidden xl:block z-[-1] -translate-y-2 min-h-full"
          priority={true}
        />
      </div>
      <OptimizedImage
        images={{
          mobile: {
            src: heroMobileImage,
            height: 1000
          },
          desktop: {
            src: heroDesktopImage,
            height: 450
          },
          large: {
            src: heroLargeImage,
            height: 500
          }
        }}
        alt="Imagem decorativa de uma cidade, contém prédios, uma rua em Z e algumas árvores"
        className="absolute top-0 bottom-0 right-0 sm:-right-10 lg:right-0 xl:hidden z-[-1] -translate-y-2 min-h-full"
        priority={true}
      />
    </section>
  )
}
