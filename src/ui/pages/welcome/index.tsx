'use client'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { isFuture, isToday } from 'date-fns'
import { useFormik } from 'formik'
import { redirect } from 'next/navigation'
import * as Yup from 'yup'

import { updateUserRequest } from '@/requests/user/updateUser'
import type { InterfaceUser } from '@/types/user'
import PersonalDataWelcomeForm from '@/ui/forms/Welcome/PersonalData'
import UpdatePasswordWelcomeForm from '@/ui/forms/Welcome/UpdatePassword'

import slide1Illustration from './assets/slide-1.png'
import slide2Illustration from './assets/slide-2.png'
import slide3Illustration from './assets/slide-3.png'
import { FormSlideLayout } from './components/FormSlideLayout'
import { PresentationSlideLayout } from './components/PresentationSlideLayout'

interface WelcomeViewProps {
  user: { name: string; id: string }
}

export function WelcomeView({ user }: WelcomeViewProps) {
  const [currentSlideGroup, setCurrentSlideGroup] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Personal Data Form
  const personalDataValidationSchema = Yup.object({
    type: Yup.string().required(),
    movingExpected: Yup.string().test(
      'A expectativa de mudança deve ser uma data no futuro',
      (value) => {
        if (!value) {
          // Retorna verdadeiro para ignorar a validação quando o valor está ausente
          return true
        }

        const inputedDate = new Date(value)

        const validDate = isFuture(inputedDate) && !isToday(inputedDate)
        return validDate
      }
    )
  })

  const personalDataFormik = useFormik({
    initialValues: {
      // birthDate: new Date().toISOString(),
      birthDate: '',
      cpf: ''
    },
    validationSchema: personalDataValidationSchema,
    validateOnChange: true,
    onSubmit: handlePersonalDataSubmit
  })

  function onPersonalDataFail() {
    toast.error('Houve um erro no servidor. Tente acessar seu convite novamente mais tarde.')

    setTimeout(() => redirect('/'), 3000)
  }

  function onPersonalDataSuccess() {
    onNext()
  }

  async function handlePersonalDataSubmit(values: Partial<InterfaceUser>) {
    if (!personalDataFormik.isValid || !user) return

    const data: Partial<InterfaceUser> = {
      ...values
    }

    const res = await updateUserRequest(user.id, data)

    if (!res) {
      onPersonalDataFail()
      return
    }

    onPersonalDataSuccess()
  }

  // Update Password Form
  const updatePasswordValidationSchema = Yup.object({
    type: Yup.string().required(),
    movingExpected: Yup.string().test(
      'A expectativa de mudança deve ser uma data no futuro',
      (value) => {
        if (!value) {
          // Retorna verdadeiro para ignorar a validação quando o valor está ausente
          return true
        }

        const inputedDate = new Date(value)

        const validDate = isFuture(inputedDate) && !isToday(inputedDate)
        return validDate
      }
    )
  })

  const updatePasswordFormik = useFormik({
    initialValues: {
      // birthDate: new Date().toISOString(),
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: updatePasswordValidationSchema,
    validateOnChange: true,
    onSubmit: handleUpdatePasswordSubmit
  })

  function onUpdatePasswordFail() {
    toast.error('Houve um erro no servidor. Tente acessar seu convite novamente mais tarde.')

    setTimeout(() => redirect('/'), 3000)
  }

  function onUpdatePasswordSuccess() {
    onNext()
  }

  async function handleUpdatePasswordSubmit(values: Partial<InterfaceUser>) {
    if (!personalDataFormik.isValid || !user) return

    const data: Partial<InterfaceUser> = {
      ...values
    }

    const res = await updateUserRequest(user.id, data)

    if (!res) {
      onUpdatePasswordFail()
      return
    }

    onUpdatePasswordSuccess()
  }

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
        <FormSlideLayout
          key="form-1"
          title={`Estamos quase lá, ${user.name}`}
          description="Para garantir a confiança nas informações que disponibilizamos e a segurança dos imóveis, condomínios e seus moradores, precisamos de algumas informações suas."
          fields={
            <PersonalDataWelcomeForm
              values={personalDataFormik.values}
              handleChange={personalDataFormik.handleChange}
            />
          }
          submitDisabled={!personalDataFormik.isValid || personalDataFormik.isSubmitting}
          onSubmit={personalDataFormik.handleSubmit}
        />,
        <FormSlideLayout
          key="form-2"
          title="E para confluir"
          description="Defina a sua senha"
          fields={
            <UpdatePasswordWelcomeForm
              values={updatePasswordFormik.values}
              handleChange={updatePasswordFormik.handleChange}
            />
          }
          submitDisabled={!updatePasswordFormik.isValid || updatePasswordFormik.isSubmitting}
          onSubmit={updatePasswordFormik.handleSubmit}
        />
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

  const Slide = useCallback(
    () => slideGroups[currentSlideGroup].slides[currentSlide],
    [currentSlideGroup, currentSlide]
  )

  return (
    <div className="w-screen h-screen">
      <Slide />
    </div>
  )
}
