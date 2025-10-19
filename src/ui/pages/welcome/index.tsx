'use client'

import { useCallback, useState } from 'react'

import { useRouter } from 'next/navigation'

import { updateUserRequest } from '@/requests/client/user/updateUser'

import slide1Illustration from './assets/slide-1.png'
import slide2Illustration from './assets/slide-2.png'
import slide3Illustration from './assets/slide-3.png'
import { NewPasswordForm } from './components/FormSlideLayout/NewPasswordForm'
import { PersonalDataForm } from './components/FormSlideLayout/PersonalDataForm'
import { PresentationSlideLayout } from './components/PresentationSlideLayout'

interface WelcomeViewProps {
  user: { name: string; id: string }
}

export function WelcomeView({ user }: WelcomeViewProps) {
  const [currentSlideGroup, setCurrentSlideGroup] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideGroups = [
    {
      name: 'presentation',
      slides: [
        <PresentationSlideLayout
          key="presentation-1"
          title="<span><strong classNames='font-semibold tracking-wider'>Boas vindas à Teto de Vidro!</strong></span> <span>Sua busca por imóvel simplificada</span>"
          description="Chega de planilhas perdidas e anotações espalhadas, aqui você organiza todos os imóveis de interesse em um só lugar"
          image={slide1Illustration}
          alt="Uma pessoa feliz com elementos de organização"
          onNext={onNext}
          onSkipSlideGroup={goToNextSlideGroup}
          tracking={{ current: currentSlide, max: 3 }}
        />,
        <PresentationSlideLayout
          key="presentation-2"
          title="<span><strong classNames='font-semibold tracking-wider'>Acompanhe Cada Detalhe</strong></span> <span>Compartilhe com Quem Importa</span>"
          description="Acompanhe de perto cada imóvel. Atualize o status (visitado, descartado, etc), adicione comentários, impressões e checklists."
          image={slide2Illustration}
          alt="Um grupo de pessoas colaborando diante de um grande monitor"
          onNext={onNext}
          onSkipSlideGroup={goToNextSlideGroup}
          tracking={{ current: currentSlide, max: 3 }}
        />,
        <PresentationSlideLayout
          key="presentation-3"
          title="<span>Construindo juntos um</span><span><strong classNames='font-semibold tracking-wider'>futuro transparente</strong></span>"
          description="Usando a Teto de Vidro para se organizar você contribui para uma base de dados coletiva e confiável. Imagine saber sobre um imóvel pelos olhos de quem já esteve lá."
          image={slide3Illustration}
          alt="Um grupo de pessoas trocando informações e construindo juntos um banco de dados"
          onNext={goToNextSlideGroup}
          tracking={{ current: currentSlide, max: 3 }}
        />
      ]
    },
    {
      name: 'form',
      slides: [
        <PersonalDataForm key="welcome-personal-data-form" user={user} onNext={onNext} />,
        <NewPasswordForm key="welcome-new-password" user={user} onNext={onComplete} />
      ]
    }
  ]

  function goToNextSlideGroup() {
    setCurrentSlideGroup(currentSlideGroup + 1)
    setCurrentSlide(0)
  }

  function onNext() {
    setCurrentSlide(currentSlide + 1)
  }

  const router = useRouter()
  async function onComplete() {
    await updateUserRequest(user.id, { welcomeCompleted: true })
    router.push('/login')
  }

  const Slide = useCallback(
    () => slideGroups[currentSlideGroup].slides[currentSlide],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSlideGroup, currentSlide]
  )

  return (
    <div className="w-screen h-screen">
      <Slide />
    </div>
  )
}
