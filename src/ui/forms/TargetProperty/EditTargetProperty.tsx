'use client'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import CollapsableBox from '@ui/CollapsableBox'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { CreateTargetPropertyRequestProps } from '@/requests/targetProperty/create'
import { editTargetProperty } from '@/requests/targetProperty/edit'
import { CEPService } from '@/services/cep'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import SubmitButton from '@/ui/components/base/form/buttons/SubmitButton'
import Input from '@/ui/components/base/form/inputs/Input'

interface CreateTargetPropertyFormProps {
  onSuccess: (_id: string) => void
  onFail: () => void
  currentData: TargetPropertyInterface
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const EditTargetPropertyForm = ({
  onSuccess,
  onFail,
  currentData
}: CreateTargetPropertyFormProps) => {
  const [addressBoxOpen, setAddressBoxOpen] = useState<boolean>(false)
  const [priceBoxOpen, setPriceBoxOpen] = useState<boolean>(true)

  const validationSchema = Yup.object({
    postalCode: Yup.string()
      .matches(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato 12345-678')
      .min(9, 'O CEP deve conter 8 dígitos'),
    street: Yup.string().required('Campo obrigatório'),
    neighborhood: Yup.string().required('Campo obrigatório'),
    city: Yup.string().required('Campo obrigatório'),
    uf: Yup.string()
      .required('Campo obrigatório')
      .min(2, 'Mínimo 2 letras')
      .max(2, 'Máximo 2 letras'),
    lotNumber: Yup.string(),
    price: Yup.number().required()
  })

  const formik = useFormik({
    initialValues: {
      nickname: currentData.nickname ?? '',
      postalCode: currentData.postalCode ?? '',
      street: currentData.street ?? '',
      neighborhood: currentData.neighborhood ?? '',
      city: currentData.city ?? '',
      uf: currentData.uf ?? '',
      country: currentData.country ?? 'Brasil',
      block: currentData.block ?? '0',
      lotNumber: currentData.lotNumber ?? '',
      propertyNumber: currentData.number ?? '',
      size: currentData.size ?? 0,
      rooms: currentData.rooms ?? 1,
      bathrooms: currentData.bathrooms ?? 1,
      parkingSpots: currentData.parking ?? 0,
      iptu: currentData.iptu ?? 0,
      condoPricing: currentData.condoPricing ?? 0,
      price: currentData.price ?? 0
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()

  async function handleSubmit(values: CreateTargetPropertyRequestProps) {
    if (!formik.isValid || !user) return

    const data: CreateTargetPropertyRequestProps = {
      huntId: currentData.huntId,
      ...values
    }

    const res = await editTargetProperty(currentData.id, data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res?.id)
  }

  async function completeFieldsByCEP(e: React.FocusEvent<HTMLInputElement>) {
    const postalCode = e.target.value

    const cep = CEPService()

    const data = await cep.get(postalCode.replace(/\D/g, ''))

    if (!data) return

    for (const dt in data) {
      formik.setFieldValue(dt, data[dt] ?? '')
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-6">
        <section className="w-full flex flex-col gap-4">
          <h3 className="text-xl text-brand-primary-700 pb-0.5 border-b-brand-gray-400 border-b-2 w-3/4 uppercase">
            Incluir imóvel de interesse
          </h3>
          <div className="grid md:grid-cols-12 gap-x-4 gap-y-5">
            <span className="col-span-12 flex flex-row items-end gap-4">
              <Input
                label="Título"
                description="Dê um nome para identificar esse imóvel"
                name="nickname"
                themeSize={formThemeSize}
                theme={themePallete}
                placeholder={`Apelido do imóvel`}
                value={formik.values.nickname}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          <div className="w-full">
            <CollapsableBox
              label="Endereço"
              open={addressBoxOpen}
              toggleBox={() => setAddressBoxOpen(!addressBoxOpen)}
            >
              <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5 mt-2">
                <FormSectionLabel>Endereço principal</FormSectionLabel>
                <span className="col-span-4">
                  <Input
                    label="CEP"
                    name="postalCode"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    placeholder="00000-000"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    onBlur={completeFieldsByCEP}
                  />
                </span>
                <span className="col-span-6">
                  <Input
                    label="Rua / Estrada / Logradouro"
                    name="street"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.street}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-2">
                  <Input
                    label="Número"
                    name="lotNumber"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    placeholder={`123`}
                    value={formik.values.lotNumber}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="Bairro"
                    name="neighborhood"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="Cidade"
                    name="city"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="Estado"
                    name="uf"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.uf}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="País"
                    name="country"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5 mt-6">
                <FormSectionLabel>Imóvel</FormSectionLabel>
                <span className="col-span-4">
                  <Input
                    label="Identificação"
                    description="Apartamento, casa"
                    name="propertyNumber"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    placeholder="301 A"
                    value={formik.values.propertyNumber}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-4">
                  <Input
                    label="Bloco"
                    description="Se não houver, deixar 0"
                    name="block"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.block}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-4">
                  <Input
                    label="Tamanho"
                    description="Em metros quadrados"
                    name="size"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.size}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="Quartos"
                    name="rooms"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.rooms}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="Banheiros"
                    name="bathrooms"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.bathrooms}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-3">
                  <Input
                    label="Vagas de Garagem"
                    name="parkingSpots"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.parkingSpots}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
            </CollapsableBox>
          </div>
          <div className="w-full">
            <CollapsableBox
              label="Custos"
              open={priceBoxOpen}
              toggleBox={() => setPriceBoxOpen(!priceBoxOpen)}
            >
              <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5 mt-2">
                <FormSectionLabel>Custos Mensais</FormSectionLabel>
                <span className="col-span-4 flex flex-row items-end gap-4">
                  <Input
                    label="Aluguel"
                    name="price"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    placeholder={`Aluguel`}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    fieldSymbol="R$"
                  />
                </span>
                <span className="col-span-4 flex flex-row items-end gap-4">
                  <Input
                    label="Condomínio"
                    name="condoPricing"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    placeholder={`Valor do condomínio`}
                    value={formik.values.condoPricing}
                    onChange={formik.handleChange}
                    fieldSymbol="R$"
                  />
                </span>
                <span className="col-span-4 flex flex-row items-end gap-4">
                  <Input
                    label="IPTU"
                    name="iptu"
                    type="number"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    placeholder={`Valor do IPTU por mês`}
                    value={formik.values.iptu}
                    onChange={formik.handleChange}
                    fieldSymbol="R$"
                  />
                </span>
              </div>
            </CollapsableBox>
          </div>
        </section>
        <SubmitButton
          label="Salvar alterações"
          isDisabled={!formik.isValid || formik.isSubmitting}
        />
      </form>
    </div>
  )
}

function FormSectionLabel({ children }: { children: ReactNode | string }) {
  return (
    <p className="col-span-12 mb-2 text-brand-primary-900 font-semibold uppercase border-b-brand-gray-400 border-b-2">
      {children}
    </p>
  )
}

export default EditTargetPropertyForm
