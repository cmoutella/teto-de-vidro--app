'use client'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

import type { CreateHuntRequestProps } from '@api/hunt/create'
import { createHunt } from '@api/hunt/create'
import { useSessionContext } from '@providers/AuthProvider'
import type { FormSizes, FormTheme } from '@ui/base/shared/formTheme'
import CollapsableBox from '@ui/CollapsableBox'

import SubmitButton from '@/ui/components/base/form/buttons/SubmitButton'
import Input from '@/ui/components/base/form/inputs/Input'

interface CreateTargetPropertyFormProps {
  onSuccess: (_id: string) => void
  onFail: () => void
}

const formThemeSize: FormSizes = 'lg'
const themePallete: FormTheme = 'light'

const CreateTargetProperty = ({ onSuccess, onFail }: CreateTargetPropertyFormProps) => {
  const [adUrl, setAdUrl] = useState<string>('')

  const [addressBoxOpen, setAddressBoxOpen] = useState<boolean>(false)
  const [postalCode, setPostalCode] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [lotNumber, setLotNumber] = useState<string>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [uf, setUF] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('Brasil')

  const hasMinimalLotData = !!street && !!neighborhood && !!city && !!uf && !!country

  const handlePostalCode = (e: ChangeEvent<HTMLInputElement>) => {
    // formatação do postalCode
    setPostalCode(e.target.value)
  }

  const handleStreet = (e: ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
  }

  const handleLotNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setLotNumber(e.target.value)
  }

  const handleNeighborhood = (e: ChangeEvent<HTMLInputElement>) => {
    setNeighborhood(e.target.value)
  }
  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }
  const handleUF = (e: ChangeEvent<HTMLInputElement>) => {
    setUF(e.target.value)
  }
  const handleCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value)
  }

  const [block, setBlock] = useState<string>('')
  const [propertyNumber, setPropertyNumber] = useState<string>('')
  const [size, setSize] = useState<number>(0)
  const [rooms, setRooms] = useState<number>(0)
  const [bathrooms, setBathrooms] = useState<number>(0)
  const [parkingSpots, setParkingSpots] = useState<number>(0)

  const handleBlock = (e: ChangeEvent<HTMLInputElement>) => {
    setBlock(e.target.value)
  }

  const handlePropertyNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPropertyNumber(e.target.value)
  }

  const handleSize = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value))
  }

  const handleRooms = (e: ChangeEvent<HTMLInputElement>) => {
    setRooms(Number(e.target.value))
  }

  const handleBathrooms = (e: ChangeEvent<HTMLInputElement>) => {
    setBathrooms(Number(e.target.value))
  }

  const handleParkingSpots = (e: ChangeEvent<HTMLInputElement>) => {
    setParkingSpots(Number(e.target.value))
  }

  const { user } = useSessionContext()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasMinimalLotData || !user) return

    const data: CreateHuntRequestProps = {
      creatorId: user.id
    }

    const res = await createHunt(data)

    if (!res) {
      onFail()
      return
    }

    onSuccess(res?.id)
  }

  const handleChangeAdUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setAdUrl(e.target.value)
  }

  const handleGetAdData = (_e: ChangeEvent<HTMLInputElement>) => {
    const _adURI = new URL(adUrl)

    // TODO: Scrappers endpoint
    // identificar o dominio
    // executar o scrapper
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <section className="w-full">
          <h6 className="text-xl text-brand-primary-700">Identificando o imóvel</h6>
          <div className="grid md:grid-cols-12 gap-x-4 gap-y-5">
            <span className="col-span-12">
              <Input
                label="Anúncio do imóvel"
                description="Vamos auto preencher o resto do formulário com dados objetidos no anúncio"
                name="adUrl"
                themeSize={formThemeSize}
                theme={themePallete}
                placeholder={`Cole aqui o link do anúncio`}
                value={adUrl}
                onChange={handleChangeAdUrl}
                onBlur={handleGetAdData}
              />
            </span>
          </div>
          <CollapsableBox
            label="Endereço"
            open={addressBoxOpen}
            toggleBox={() => setAddressBoxOpen(!addressBoxOpen)}
          >
            <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
              <p className="col-span-12 mb-2">Endereço principal</p>
              <span className="col-span-4">
                <Input
                  label="CEP"
                  name="postalCode"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder="00000-000"
                  value={postalCode}
                  onChange={handlePostalCode}
                />
              </span>
              <span className="col-span-6">
                <Input
                  label="Rua / Estrada / Logradouro"
                  name="street"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={street}
                  onChange={handleStreet}
                />
              </span>
              <span className="col-span-2">
                <Input
                  label="Número"
                  name="lotNumber"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder={`Mudança de ${new Date().getFullYear()}`}
                  value={lotNumber}
                  onChange={handleLotNumber}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="Bairro"
                  name="neighborhood"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder={`Mudança de ${new Date().getFullYear()}`}
                  value={neighborhood}
                  onChange={handleNeighborhood}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="Cidade"
                  name="city"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder={`Mudança de ${new Date().getFullYear()}`}
                  value={city}
                  onChange={handleCity}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="Estado"
                  name="uf"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder={`Mudança de ${new Date().getFullYear()}`}
                  value={uf}
                  onChange={handleUF}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="País"
                  name="country"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder={`Mudança de ${new Date().getFullYear()}`}
                  value={country}
                  onChange={handleCountry}
                />
              </span>
            </div>
            <div className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
              <p className="col-span-12 mb-2">Imóvel</p>
              <span className="col-span-4">
                <Input
                  label="Identificação"
                  description="Apartamento, casa"
                  name="propertyNumber"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  placeholder="301 A"
                  value={propertyNumber}
                  onChange={handlePropertyNumber}
                />
              </span>
              <span className="col-span-4">
                <Input
                  label="Bloco"
                  description="Se não houver, deixar 0"
                  name="block"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={block}
                  onChange={handleBlock}
                />
              </span>
              <span className="col-span-4">
                <Input
                  label="Tamanho"
                  description="Em metros quadrados"
                  name="size"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={size}
                  onChange={handleSize}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="Quartos"
                  name="rooms"
                  type="number"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={rooms}
                  onChange={handleRooms}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="Banheiros"
                  name="bathrooms"
                  type="number"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={bathrooms}
                  onChange={handleBathrooms}
                />
              </span>
              <span className="col-span-3">
                <Input
                  label="Vagas de Garagem"
                  name="parkingSpots"
                  type="number"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={parkingSpots}
                  onChange={handleParkingSpots}
                />
              </span>
            </div>
          </CollapsableBox>
        </section>
        <SubmitButton isDisabled={!hasMinimalLotData} />
      </form>
    </div>
  )
}

export default CreateTargetProperty
