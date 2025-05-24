'use client'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import cx from 'classnames'

import { useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { InterfaceHunt } from '@/types/app'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import DeleteConfirmation from '@/ui/forms/DeleteConfirmation'
import EditTargetPropertyForm from '@/ui/forms/TargetProperty/EditTargetProperty'
import PropertyContactForm from '@/ui/forms/TargetProperty/PropertyContact'
import { useAddressString } from '@/utils/address/useAddressString'
import { formatMoneyValue } from '@/utils/string/formatMoney'
import { lastUpdateMessage } from '@/utils/string/lastUpdateMessage'

import Button from '../../base/Button'
import Icon from '../../base/Icon'
import { AmenitiesDisplay } from './amenity/AmenitiesDisplay'
import { BudgetDiff } from './BudgetDiff'
import { CommentsDisplay } from './comments/CommentsDisplay'
import { StagePill } from './StagePill'

interface TargetPropertyItemProps {
  target: TargetPropertyInterface
  hunt: InterfaceHunt
}

export default function TargetPropertyItem({ target, hunt }: TargetPropertyItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { modal } = useUIContext()
  const { fetchProperties } = useHuntContext()

  const { removeTargetProperty } = useHuntContext()

  function openEditModal() {
    function handleFail(feedback: string) {
      toast.error(feedback)
    }

    function handleSuccess() {
      modal.close()
      toast.success('Informações atualizadas com sucesso!')

      fetchProperties()
    }

    modal.open(
      'large',
      <EditTargetPropertyForm
        currentData={target as TargetPropertyInterface}
        onSuccess={handleSuccess}
        onFail={handleFail}
        huntSettings={hunt}
      />
    )
  }

  function openDeleteConfirmation(targetId: string) {
    function handleFail() {
      toast.error('Algo deu errado')
      modal.close()
    }

    function handleSuccess() {
      modal.close()
    }

    modal.open(
      'small',
      <DeleteConfirmation
        confirm={async () => await removeTargetProperty(targetId)}
        close={handleSuccess}
        onFail={handleFail}
      />
    )
  }

  function openContactFormModal() {
    function handleFail() {
      toast.error('Algo deu errado')
      modal.close()
    }

    function handleSuccess() {
      modal.close()
      toast.success('Informações atualizadas com sucesso!')

      fetchProperties()
    }

    modal.open(
      'medium',
      <PropertyContactForm onSuccess={handleSuccess} currentData={target} onFail={handleFail} />
    )
  }

  const totalPricing = useMemo(() => {
    if (hunt.type === 'rent' || hunt.type === 'either') {
      return target.rentPrice + (target.condoPricing ?? 0) + target.iptu
    } else {
      return undefined
    }
  }, [target, hunt])

  const rentBudgetDeviant = useMemo(() => {
    if (!hunt.maxBudget || hunt.type === 'buy' || !totalPricing) return 0

    if (totalPricing > hunt.maxBudget) {
      return (totalPricing / hunt.maxBudget - 1) * 100
    }

    if (totalPricing < hunt.maxBudget) {
      return -((1 - totalPricing / hunt.maxBudget) * 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hunt, totalPricing])

  const purchaseBudgetDeviant = useMemo(() => {
    if (!hunt.maxBudget || hunt.type === 'rent') return 0

    if (target.sellPrice > hunt.maxBudget) {
      return (target.sellPrice / hunt.maxBudget - 1) * 100
    }

    if (target.sellPrice < hunt.maxBudget) {
      return -((1 - target.sellPrice / hunt.maxBudget) * 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hunt])

  const address = useAddressString({
    street: target.street,
    lotNumber: target.lotNumber,
    block: target.block,
    propertyNumber: target.propertyNumber,
    city: target.city,
    uf: target.uf
  })

  const CollapseIcon = useCallback(() => {
    const style = cx(
      'translate-y-0.5 sm:translate-y-1.5 cursor-pointer text-brand-primary-500 opacity-80 hover:opacity-100 hover:font-semibold'
    )

    return isOpen ? (
      <Icon icon="minus-circle" mode="solid" className={style} onClick={() => setIsOpen(!isOpen)} />
    ) : (
      <Icon icon="plus-circle" mode="solid" className={style} onClick={() => setIsOpen(!isOpen)} />
    )
  }, [isOpen])

  return (
    <div className={cx('w-full rounded-md relative')}>
      {/* HEADER */}
      <div
        className={cx(
          'w-full p-3 pb-4 sm:px-4 sm:py-5 bg-brand-primary-200 border border--brand-primary-200 text-brand-primary-900 flex flex-row gap-3',
          {
            'rounded-md': !isOpen,
            'rounded-t-md': isOpen
          }
        )}
      >
        <CollapseIcon />
        <div className="w-full">
          <div className="w-full flex flex-row justify-between items-start mb-4 sm:mb-3">
            <div className="flex items-start flex-col justify-start gap-0.5">
              <h3 className="font-semibold text-lg sm:text-2xl">{target.nickname}</h3>
              <p>{address}</p>
            </div>
            {/* TODO: colocar as ações no responsivo */}
            <div className="text-xs hidden sm:flex flex-row gap-0.5">
              <Button
                label={<Icon icon="pencil" mode="outline" size="xs" className="translate-x-0.5" />}
                onlyIcon={true}
                className={cx(
                  'text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
                )}
                onClick={() => openEditModal()}
              />
              <Button
                label={<Icon icon="trash" size="xs" />}
                onlyIcon={true}
                className={cx(
                  'text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white flex justify-center'
                )}
                onClick={() => openDeleteConfirmation(target.id)}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 sm:gap-2 gap-x-4">
              {(hunt.type === 'rent' || hunt.type === 'either') && (
                <div className="col-span-6 md:col-span-2 xl:col-span-1 flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">ALUGUEL</p>
                  <p>R$ {formatMoneyValue(target.rentPrice.toString())}</p>
                </div>
              )}
              {(hunt.type === 'buy' || hunt.type === 'either') && (
                <div className="col-span-6 md:col-span-2 xl:col-span-1 flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">VENDA</p>
                  <p>R$ {formatMoneyValue(target.sellPrice.toString())}</p>
                  {!!purchaseBudgetDeviant && <BudgetDiff diff={purchaseBudgetDeviant} />}
                </div>
              )}
              <div className="col-span-6 md:col-span-2 xl:col-span-1 flex flex-col items-start">
                <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">CONDOMÍNIO</p>
                <p>
                  R${' '}
                  {!target.condoPricing || target.condoPricing === 0
                    ? '?'
                    : formatMoneyValue(target.condoPricing.toString())}
                </p>
              </div>
              <div className="col-span-6 md:col-span-2 xl:col-span-1 flex flex-col items-start">
                <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">IPTU</p>
                <p>R$ {target.iptu === 0 ? '?' : formatMoneyValue(target.iptu.toString())}</p>
              </div>
              <div className="col-span-6 md:col-span-2 xl:col-span-1 flex flex-col items-start">
                <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">TOTAL</p>
                <div className="flex items-center whitespace-nowrap">
                  <p className="text-lg whitespace-nowrap font-semibold relative">
                    R$ {totalPricing && formatMoneyValue(totalPricing?.toString())}
                    {!!rentBudgetDeviant && <BudgetDiff diff={rentBudgetDeviant} />}
                  </p>
                </div>
              </div>
              <div className="col-span-6 md:col-span-2 xl:col-span-1 flex-col items-start hidden md:flex">
                <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">TAMANHO</p>
                <p>{target.size === 0 ? '?' : `${target.size}m2`}</p>
              </div>
              <div className="col-span-6 sm:col-span-2 flex flex-col items-start">
                <p className="text-xs sm:text-sm font-semibold whitespace-nowrap mb-1">ETAPA</p>
                <div>
                  <StagePill stage={target.huntingStage} targetId={target.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* COLLAPSED */}
      {isOpen && (
        <div
          className={
            'sm:grid sm:grid-cols-12 rounded-b-md border-b border-x border-b-brand-primary-400 border-x-brand-primary-400 text-brand-primary-800 p-3 sm:px-4 sm:pt-3 pb-6 gap-4 gap-x-5'
          }
        >
          <div className="sm:col-span-5 flex flex-col gap-5">
            <div className="w-full">
              <div className="w-full mb-4 p-0.5 border-b-[2px] border-b-brand-primary-700">
                <p className="sm:text-xl font-medium">Imóvel</p>
              </div>
              <div className="w-full flex flex-wrap gap-x-6 gap-y-4 sm:gap-y-2">
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                    ENDEREÇO
                  </p>
                  <p className="text-sm">
                    {target.street}
                    {target.lotNumber && `, ${target.lotNumber}`}
                  </p>
                </div>
                {!target.noComplement && (
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-xs sm:text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                      COMPLEMENTO
                    </p>
                    <p className="text-sm">
                      {target.block && target.block !== '0' && `Bl ${target.block}`}
                      {target.propertyNumber ?? '?'}
                    </p>
                  </div>
                )}
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                    BAIRRO
                  </p>
                  <p className="text-sm">{target.neighborhood ?? '?'}</p>
                </div>
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                    CIDADE
                  </p>
                  <p className="text-sm">{target.city ?? '?'}</p>
                </div>
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                    UF
                  </p>
                  <p className="text-sm">{target.uf ?? '?'}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full mb-4 p-0.5 border-b-[2px] border-b-brand-primary-700 flex justify-between items-center">
                <p className="sm:text-xl font-medium">Contato</p>
                <Button
                  label={<Icon icon="pencil" mode="outline" size="2xs" />}
                  size="xsmall"
                  onlyIcon={true}
                  className={cx(
                    'text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
                  )}
                  onClick={() => openContactFormModal()}
                />
              </div>
              {!target.contactName && !target.realState && (
                <div className="w-full">
                  <p className="text-brand-gray-800">
                    Adicione informações do contato desse imóvel e ao final você pode avaliar o
                    atendimento
                  </p>
                </div>
              )}
              {!!target.realState && (
                <div className="w-full flex flex-wrap gap-x-6 gap-y-2">
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-xs sm:text-sm font-medium whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                      Imobiliária
                    </p>
                    <p className="text-sm">{target.realState}</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-xs sm:text-sm font-medium whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                      Telefone
                    </p>
                    <p className="text-sm">{target.realStatePhoneNumber ?? '?'}</p>
                  </div>
                </div>
              )}
              {!!target.contactName && (
                <div className="w-full flex flex-wrap gap-x-6 gap-y-2">
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-xs sm:text-sm font-medium whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                      Nome do Contato
                    </p>
                    <p className="text-sm">{target.contactName}</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-xs sm:text-sm font-medium whitespace-nowrap text-brand-primary-900 mb-1 sm:mb-2">
                      WhatZap
                    </p>
                    <p className="text-sm">{target.contactWhatzap ?? '?'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="sm:col-span-7">
            <AmenitiesDisplay amenities={target.targetAmenities} targetId={target.id} />
            <div className="mt-4 w-full">
              <CommentsDisplay targetId={target.id} />
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <span className="text-xs sm:text-sm absolute right-4 bottom-2 text-brand-primary-800">
          Última atualização {lastUpdateMessage(target.updatedAt)}
        </span>
      )}
    </div>
  )
}
