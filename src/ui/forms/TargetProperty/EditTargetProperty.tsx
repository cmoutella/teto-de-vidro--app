'use client'
import { useEffect, useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import CollapsableBox from '@ui/CollapsableBox'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useUIContext } from '@/providers/UIProvider'
import type { CreateTargetPropertyRequestProps } from '@/requests/targetProperty/create'
import { editTargetProperty } from '@/requests/targetProperty/edit'
import type { AddressKeys } from '@/services/cep'
import { CEPService } from '@/services/cep'
import type { InterfaceHunt } from '@/types/hunt'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import SubmitButton from '@/ui/components/base/form/buttons/SubmitButton'
import { Checkbox } from '@/ui/components/base/form/Checkbox'
import { CEPField } from '@/ui/components/base/form/fields/cep/CEPField'
import { MoneyField } from '@/ui/components/base/form/fields/money/MoneyField'
import { FormSectionLabel } from '@/ui/components/base/form/FormSectionLabel'
import Input from '@/ui/components/base/form/inputs/Input'
import { useAddressString } from '@/utils/address/useAddressString'

import { usePriceString } from './shared/usePriceString'

interface EditTargetPropertyFormProps {
  onSuccess: (_id: string) => void
  onFail: (_f: string) => void
  currentData: TargetPropertyInterface
  huntSettings: InterfaceHunt
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const EditTargetPropertyForm = ({
  onSuccess,
  onFail,
  currentData,
  huntSettings
}: EditTargetPropertyFormProps) => {
  const [addressBoxOpen, setAddressBoxOpen] = useState<boolean>(false)
  const [priceBoxOpen, setPriceBoxOpen] = useState<boolean>(true)
  const [submitEnabled, setSubmitEnabled] = useState(false)

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Campo obrigatório'),
    postalCode: Yup.string()
      .matches(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato 12345-678')
      .min(9, 'O CEP deve conter 8 números')
      .optional(),
    street: Yup.string().required('Campo obrigatório'),
    neighborhood: Yup.string().required('Campo obrigatório'),
    city: Yup.string().required('Campo obrigatório'),
    uf: Yup.string()
      .required('Campo obrigatório')
      .min(2, 'Mínimo 2 letras')
      .max(2, 'Máximo 2 letras'),
    lotNumber: Yup.string(),
    sellPrice: Yup.number(),
    rentPrice: Yup.number(),
    contoPricing: Yup.number(),
    iptu: Yup.number()
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
      noLotNumber: currentData.noLotNumber ?? false,
      lotNumber: currentData.lotNumber ?? '',
      noComplement: currentData.noComplement ?? false,
      block: currentData.block ?? '0',
      propertyNumber: currentData.propertyNumber ?? '',
      size: currentData.size ?? 0,
      rooms: currentData.rooms ?? 1,
      bathrooms: currentData.bathrooms ?? 1,
      parkingSpots: currentData.parking ?? 0,
      iptu: currentData.iptu ?? 0,
      condoPricing: currentData.condoPricing ?? 0,
      sellPrice: currentData.sellPrice ?? 0,
      rentPrice: currentData.rentPrice ?? 0
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()
  const { modal } = useUIContext()

  useEffect(() => {
    const noMinimalInfo = formik.values.street === '' || formik.values.nickname === ''
    const actionInProgress = formik.isSubmitting || formik.isValidating

    const shouldEnable = !noMinimalInfo && formik.isValid && !actionInProgress

    setSubmitEnabled(shouldEnable)
  }, [formik])

  async function handleSubmit(values: CreateTargetPropertyRequestProps) {
    if (!formik.isValid || !user) return

    const data: CreateTargetPropertyRequestProps = {
      huntId: currentData.huntId,
      ...values
    }

    const res = await editTargetProperty(currentData.id, data)

    if (res && res.code === 'ALREADY_EXISTS') {
      onFail('Já tem um imóvel com esse endereço')
      return
    } else if (res && res.code === 'DUPLICITY_WARNING') {
      onFail(
        'Esse imóvel pode já estar cadastrado, complete o endereço para não incluir imóveis duplicados'
      )
      if (res.relative === 'byLot') {
        formik.setFieldError('propertyNumber', 'Informe o complemento')
      } else if (res.relative === 'byStreet') {
        formik.setFieldError('lotNumber', 'Informe o número')
      }
      return
    } else if (!res || !res.data) {
      onFail('Não foi possível criar o imóvel, tente novamente mais tarde')
      modal.close()
      return
    }

    onSuccess(res.data.id)
  }

  async function completeFieldsByCEP(e: React.FocusEvent<HTMLInputElement>) {
    const postalCode = e.target.value

    if (!postalCode) return

    await formik.validateField('postalCode')

    if (formik.errors.postalCode) return

    const cep = CEPService()

    const data = await cep.get(postalCode.replace(/\D/g, ''))

    if (!data) return

    for (const dt in data) {
      formik.setFieldValue(dt, data[dt as AddressKeys] ?? '')
    }
  }

  const address = useAddressString({
    street: formik.values.street,
    lotNumber: formik.values.lotNumber,
    block: formik.values.block,
    propertyNumber: formik.values.propertyNumber,
    city: formik.values.city,
    uf: formik.values.uf
  })

  const pricing = usePriceString({
    rentPrice: formik.values.rentPrice,
    sellPrice: formik.values.sellPrice,
    condoPricing: formik.values.condoPricing,
    huntSettings: huntSettings,
    iptu: formik.values.iptu
  })

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-6">
        <section className="w-full flex flex-col gap-4">
          <h3 className="text-xl text-brand-primary-700 pb-0.5 border-b-brand-gray-400 border-b-2 w-3/4 uppercase">
            Atualizar informações do imóvel
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
              resume={address}
              open={addressBoxOpen}
              toggleBox={() => setAddressBoxOpen(!addressBoxOpen)}
            >
              <div className="w-full grid grid-cols-12 gap-x-4 gap-y-5 mt-2">
                <FormSectionLabel>
                  <p>Endereço principal</p>
                  <Checkbox
                    label="Sem número"
                    checked={formik.values.noLotNumber}
                    name="noLotNumber"
                    onChange={(stateChanged) => {
                      formik.setFieldValue('noLotNumber', stateChanged)
                    }}
                  />
                </FormSectionLabel>
                <span className="col-span-12 md:col-span-4">
                  <CEPField
                    size={formThemeSize}
                    theme={themePallete}
                    value={formik.values.postalCode}
                    onChange={(value: string) => formik.setFieldValue('postalCode', value)}
                    onBlur={completeFieldsByCEP}
                    error={formik.errors.postalCode}
                  />
                </span>
                <span className="col-span-12 md:col-span-6">
                  <Input
                    label="Rua / Estrada / Logradouro"
                    name="street"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.errors.street}
                  />
                </span>
                <span className="col-span-4 md:col-span-2">
                  {!formik.values.noLotNumber && (
                    <Input
                      label="Número"
                      name="lotNumber"
                      themeSize={formThemeSize}
                      theme={themePallete}
                      placeholder={`123`}
                      value={formik.values.lotNumber}
                      onChange={formik.handleChange}
                      error={formik.errors.lotNumber}
                    />
                  )}
                </span>
                <span className="col-span-8 md:col-span-3">
                  <Input
                    label="Bairro"
                    name="neighborhood"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                  />
                </span>
                <span className="col-span-12 md:col-span-3">
                  <Input
                    label="Cidade"
                    name="city"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.errors.city}
                  />
                </span>
                <span className="col-span-6 md:col-span-3">
                  <Input
                    label="UF"
                    name="uf"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.uf}
                    onChange={formik.handleChange}
                    error={formik.errors.uf}
                  />
                </span>
                <span className="col-span-6 md:col-span-3">
                  <Input
                    label="País"
                    name="country"
                    themeSize={formThemeSize}
                    theme={themePallete}
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={formik.errors.country}
                  />
                </span>
              </div>
              <div className="w-full grid grid-cols-12 gap-x-4 gap-y-5 mt-6">
                <FormSectionLabel>
                  <p>Complemento</p>
                  <Checkbox
                    label="Sem complemento"
                    checked={formik.values.noComplement}
                    name="noComplement"
                    onChange={(stateChanged) => {
                      formik.setFieldValue('noComplement', stateChanged)
                    }}
                  />
                </FormSectionLabel>
                {!formik.values.noComplement && (
                  <span className="col-span-6 md:col-span-4">
                    <Input
                      label="Identificação"
                      description="Apartamento, casa"
                      name="propertyNumber"
                      themeSize={formThemeSize}
                      theme={themePallete}
                      placeholder="301 A"
                      value={formik.values.propertyNumber}
                      onChange={formik.handleChange}
                      error={formik.errors.propertyNumber}
                    />
                  </span>
                )}
                {!formik.values.noComplement && (
                  <span className="col-span-6 md:col-span-4">
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
                )}
              </div>
              <div className="w-full grid grid-cols-12 gap-x-4 gap-y-5 mt-6">
                <FormSectionLabel>Imóvel</FormSectionLabel>
                <span className="col-span-6 md:col-span-3">
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
                <span className="col-span-6 md:col-span-3">
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
                <span className="col-span-6 md:col-span-3">
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
                <span className="col-span-6 md:col-span-3">
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
              resume={pricing}
              open={priceBoxOpen}
              toggleBox={() => setPriceBoxOpen(!priceBoxOpen)}
            >
              <div className="w-full grid grid-cols-12 gap-x-4 gap-y-5 mt-2">
                <FormSectionLabel>Custos Mensais</FormSectionLabel>
                <span className="col-span-6 md:col-span-3">
                  <MoneyField
                    label="Preço de Aluguel"
                    name="rentPrice"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Aluguel`}
                    value={formik.values.rentPrice}
                    onChange={(value: number) => formik.setFieldValue('rentPrice', value)}
                    currencySymbol="R$"
                    siblingHeight={true}
                  />
                </span>
                <span className="col-span-6 md:col-span-3">
                  <MoneyField
                    label="Preço de Venda"
                    name="sellPrice"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Preço de venda`}
                    value={formik.values.sellPrice}
                    onChange={(value: number) => formik.setFieldValue('sellPrice', value)}
                    currencySymbol="R$"
                    siblingHeight={true}
                  />
                </span>
                <span className="col-span-6 md:col-span-3">
                  <MoneyField
                    label="Condomínio"
                    name="condoPricing"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Valor do condomínio`}
                    value={formik.values.condoPricing}
                    onChange={(value: number) => formik.setFieldValue('condoPricing', value)}
                    currencySymbol="R$"
                    siblingHeight={true}
                  />
                </span>
                <span className="col-span-6 md:col-span-3">
                  <MoneyField
                    label="IPTU"
                    description="Custo mensal iptu"
                    name="iptu"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Valor do IPTU por mês`}
                    value={formik.values.iptu}
                    onChange={(value: number) => formik.setFieldValue('iptu', value)}
                    currencySymbol="R$"
                  />
                </span>
              </div>
            </CollapsableBox>
          </div>
        </section>
        <div className="w-full flex justify-center md:justify-end items-center">
          <SubmitButton isDisabled={!submitEnabled} label="Atualizar" />
        </div>
      </form>
    </div>
  )
}

export default EditTargetPropertyForm
