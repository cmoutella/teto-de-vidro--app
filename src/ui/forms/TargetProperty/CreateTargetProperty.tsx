'use client'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { useSessionContext } from '@providers/AuthProvider'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import CollapsableBox from '@ui/CollapsableBox'
import cx from 'classnames'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useHuntContext } from '@/providers/HuntProvider'
import { scraper } from '@/requests/scraper/get'
import type { CreateTargetPropertyRequestProps } from '@/requests/targetProperty/create'
import { createTargetProperty } from '@/requests/targetProperty/create'
import type { AddressKeys } from '@/services/cep'
import { CEPService } from '@/services/cep'
import Button from '@/ui/components/base/Button'
import SubmitButton from '@/ui/components/base/form/buttons/SubmitButton'
import { CEPField } from '@/ui/components/base/form/fields/cep/CEPField'
import { MoneyField } from '@/ui/components/base/form/fields/money/MoneyField'
import Input from '@/ui/components/base/form/inputs/Input'
import { formatMoneyValue } from '@/utils/string/formatMoney'

interface CreateTargetPropertyFormProps {
  onSuccess: (_id: string) => void
  onFail: () => void
  huntId: string
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const CreateTargetPropertyForm = ({ onSuccess, onFail, huntId }: CreateTargetPropertyFormProps) => {
  const [addressBoxOpen, setAddressBoxOpen] = useState<boolean>(false)
  const [priceBoxOpen, setPriceBoxOpen] = useState<boolean>(false)

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Campo obrigatório'),
    adURL: Yup.string().test('Insira um link válido', (value) => {
      if (!value) return true
      const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i
      return regex.test(value)
    }),
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
      adURL: '',
      nickname: '',
      postalCode: '',
      street: '',
      neighborhood: '',
      city: '',
      uf: '',
      country: 'Brasil',
      block: '0',
      lotNumber: '',
      propertyNumber: '',
      size: 0,
      rooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      iptu: 0,
      sellPrice: 0,
      rentPrice: 0,
      condoPricing: 0
    },
    validationSchema,
    isInitialValid: false,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  const { user } = useSessionContext()
  const { hunt } = useHuntContext()

  async function handleSubmit(values: CreateTargetPropertyRequestProps) {
    if (!formik.isValid || !user) return

    const data: CreateTargetPropertyRequestProps = {
      huntId: huntId,
      ...values
    }

    const res = await createTargetProperty(data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res?.id)
  }

  async function fetchAdFillForm() {
    const ad = formik.values.adURL

    if (!ad) return

    const res = await scraper({ url: ad })

    if (!res) {
      formik.setFieldError('adURL', 'Não foi possível buscar os dados do anúncio.')
    }

    for (const entry in res) {
      formik.setFieldValue(entry, res[entry])
    }

    if (res?.rentPrice) {
      formik.setFieldValue('rentPrice', formatMoneyValue(res.rentPrice.toString()))
    }
    if (res?.sellPrice) {
      formik.setFieldValue('sellPrice', formatMoneyValue(res.sellPrice.toString()))
    }

    if (res?.condoPrice) {
      formik.setFieldValue('condoPricing', formatMoneyValue(res.condoPrice.toString()))
    }
  }

  async function completeFieldsByCEP(e: React.FocusEvent<HTMLInputElement>) {
    const postalCode = e.target.value

    if (!postalCode) return

    const cep = CEPService()

    const data = await cep.get(postalCode.replace(/\D/g, ''))

    if (!data) return

    for (const dt in data) {
      formik.setFieldValue(dt, data[dt as AddressKeys] ?? '')
    }
  }

  const enableButton = useMemo(() => {
    return (
      (formik.values.street !== '' && formik.values.nickname !== '') ||
      formik.isValid ||
      formik.isSubmitting
    )
  }, [formik])

  const address = useMemo(() => {
    if (!formik.values.street) return 'Complete as informações de endereço'

    const complementAddress = formik.values.propertyNumber && `,  ${formik.values.propertyNumber}`
    const baseAddress = `${formik.values.street ?? '?'}${formik.values.lotNumber && `, ${formik.values.lotNumber}`}${complementAddress}`
    const locationAddress = ` - ${formik.values.city ?? '?'},  ${formik.values.uf ?? '?'}`
    return `${baseAddress}${locationAddress}`
  }, [formik])

  const pricing = useMemo(() => {
    if ((!formik.values.rentPrice && !formik.values.sellPrice) || !hunt)
      return 'Insira os valores para este imóvel'

    const rent = `Aluguel: ${formik.values.rentPrice} | Total: ${formik.values.rentPrice + formik.values.condoPricing + formik.values.iptu}`
    const sell = `Venda: ${formik.values.sellPrice} | Total: ${formik.values.sellPrice + formik.values.condoPricing + formik.values.iptu}`

    if (hunt.type === 'buy') {
      return sell
    } else {
      return rent
    }
  }, [formik])

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
                label="Anúncio do imóvel"
                description="Vamos auto preencher o resto do formulário com dados objetidos no anúncio"
                name="adURL"
                themeSize={formThemeSize}
                theme={themePallete}
                error={formik.errors.adURL}
                placeholder={`http://www...`}
                value={formik.values.adURL}
                onChange={formik.handleChange}
              />
              <Button
                label="Preencher"
                size="xxlarge"
                onClick={fetchAdFillForm}
                className={cx(
                  'bg-brand-primary-400 hover:bg-brand-primary-800 text-brand-primary-900 hover:text-white min-w-20 disabled:bg-slate-300 disabled:text-slate-500 translate-y-2'
                )}
                disabled={formik.values.adURL === '' || !!formik.errors.adURL}
              />
            </span>
          </div>
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
              <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5 mt-2">
                <FormSectionLabel>Endereço principal</FormSectionLabel>
                <span className="col-span-4">
                  <CEPField
                    size={formThemeSize}
                    theme={themePallete}
                    value={formik.values.postalCode}
                    onChange={(value: string) => formik.setFieldValue('postalCode', value)}
                    onBlur={completeFieldsByCEP}
                    error={formik.errors.postalCode}
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
                    error={formik.errors.street}
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
                    error={formik.errors.city}
                  />
                </span>
                <span className="col-span-3">
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
                <span className="col-span-3">
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
              resume={pricing}
              open={priceBoxOpen}
              toggleBox={() => setPriceBoxOpen(!priceBoxOpen)}
            >
              <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5 mt-2">
                <FormSectionLabel>Custos Mensais</FormSectionLabel>
                <span className="col-span-3 flex flex-row items-end gap-4">
                  <MoneyField
                    label="Preço de Aluguel"
                    name="rentPrice"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Aluguel`}
                    value={formik.values.rentPrice}
                    onChange={(value: number) => formik.setFieldValue('rentPrice', value)}
                    currencySymbol="R$"
                  />
                </span>
                <span className="col-span-3 flex flex-row items-end gap-4">
                  <MoneyField
                    label="Preço de Venda"
                    name="sellPrice"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Preço de venda`}
                    value={formik.values.sellPrice}
                    onChange={(value: number) => formik.setFieldValue('sellPrice', value)}
                    currencySymbol="R$"
                  />
                </span>
                <span className="col-span-3 flex flex-row items-end gap-4">
                  <MoneyField
                    label="Condomínio"
                    name="condoPricing"
                    size={formThemeSize}
                    theme={themePallete}
                    placeholder={`Valor do condomínio`}
                    value={formik.values.condoPricing}
                    onChange={(value: number) => formik.setFieldValue('condoPricing', value)}
                    currencySymbol="R$"
                  />
                </span>
                <span className="col-span-3 flex flex-row items-end gap-4">
                  <MoneyField
                    label="IPTU"
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
        <SubmitButton isDisabled={!enableButton} label="Criar" />
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

export default CreateTargetPropertyForm
