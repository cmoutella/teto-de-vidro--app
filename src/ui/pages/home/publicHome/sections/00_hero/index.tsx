import Image from 'next/image'

import heroDesktopImage from '../../assets/hero-desktop.png'

//TODO: desktop

export function HeroSection() {
  return (
    <section className="flex justify-center relative w-full z-0 overflow-hidden">
      <div className="container px-14 py-44 z-5">
        <div>
          <h1 className="text-center md:text-start font-medium text-3xl md:text-4xl flex flex-col mb-10">
            <span>
              Viemos pra <span className="text-4xl md:text-[40px] font-semibold">descomplicar</span>
            </span>
            <span>sua busca por imóvel</span>
          </h1>
          <h2 className="text-2xl md:text-[26px] flex flex-col font-medium">
            <span>Chega de planilhas e anotações perdidas.</span>
            <span>Acompanhe cada imóvel de perto.</span>
          </h2>
        </div>
      </div>
      <Image
        src={heroDesktopImage}
        className="absolute top-0 right-0 z-[-1]"
        alt="Imagem decorativa de uma cidade, contém prédios, uma rua em Z e algumas árvores"
        height={550}
      />
    </section>
  )
}
