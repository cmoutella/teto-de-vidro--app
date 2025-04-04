import { useMemo, useState } from 'react'

import cx from 'classnames'

import { useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { InterfaceHunt } from '@/types/app'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import EditTargetPropertyForm from '@/ui/forms/TargetProperty/EditTargetProperty'
import { lastUpdateMessage } from '@/utils/string/lastUpdateMessage'

import Button from '../../base/Button'
import Icon from '../../base/Icon'
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
    function handleFail() {
      // TODO: EditHunt handle fail
      console.log('fail EditHunt')
    }

    function handleSuccess() {
      modal.close
      fetchProperties()
    }

    modal.open(
      'large',
      <EditTargetPropertyForm
        currentData={target as TargetPropertyInterface}
        onSuccess={handleSuccess}
        onFail={handleFail}
      />
    )
  }

  const totalPricing = useMemo(() => {
    return target.price + (target.condoPricing ?? 0) + target.iptu
  }, [target])

  const budgetDeviant = useMemo(() => {
    if (!hunt.maxBudget && !hunt.minBudget) return 0

    if (totalPricing > hunt.maxBudget) {
      return (totalPricing / hunt.maxBudget - 1) * 100
    }

    if (totalPricing < hunt.maxBudget) {
      return -((1 - totalPricing / hunt.maxBudget) * 100)
    }

    return 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hunt])

  return (
    <div className={cx('w-full rounded-md relative')}>
      {/* HEADER */}
      <div
        className={cx(
          'w-full px-4 py-5 bg-brand-primary-200 border border-brand-primary-200 text-brand-primary-900 flex flex-row gap-3',
          {
            'rounded-md': !isOpen,
            'rounded-t-md': isOpen
          }
        )}
      >
        <Button
          label={isOpen ? '-' : '+'}
          size="xsmall"
          className={cx(
            '!h-7 !w-7 !min-w-7 px-4',
            'flex justify-center items-center font-semibold text-base',
            {
              'bg-brand-primary-600 border border-brand-primary-600 text-white hover:bg-brand-primary-700 hover:border-white hover:font-semibold':
                isOpen,
              'bg-brand-primary-400 border border-brand-primary-500 text-brand-primary-800 hover:bg-brand-primary-500 hover:border-white hover:text-white hover:font-semibold':
                !isOpen
            }
          )}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="w-full">
          <div className="w-full flex flex-row justify-between items-end mb-3">
            <div className="flex items-center flex-row justify-start gap-2">
              <h3 className="font-semibold text-2xl">{target.nickname}</h3>
            </div>
            <div className="text-xs flex flex-row gap-0.5">
              <Button
                label="Editar"
                className={cx(
                  'border border-brand-primary-500 text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
                )}
                onClick={() => openEditModal()}
              />
              <Button
                label={<Icon icon="trash" size="xs" />}
                className={cx(
                  'border border-red-500 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white !min-w-11 !w-11 flex justify-center'
                )}
                onClick={() => removeTargetProperty(target.id)}
              />
            </div>
          </div>
          <div className="w-full">
            {(hunt.type === 'rent' || hunt.type === 'either') && (
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1 flex flex-col items-center">
                  <p className="text-sm font-semibold whitespace-nowrap">VALOR</p>
                  <p>R$ {target.price}</p>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <p className="text-sm font-semibold whitespace-nowrap">CONDOMÍNIO</p>
                  <p>
                    R${' '}
                    {!target.condoPricing || target.condoPricing === 0 ? '?' : target.condoPricing}
                  </p>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <p className="text-sm font-semibold whitespace-nowrap">IPTU</p>
                  <p>R$ {target.iptu === 0 ? '?' : target.iptu}</p>
                </div>
                <div className="col-span-1 flex flex-col items-cente">
                  <p className="text-sm font-semibold whitespace-nowrap">TOTAL</p>
                  <div className="flex items-center whitespace-nowrap relative">
                    <p className="text-lg whitespace-nowrap font-semibold">R$ {totalPricing}</p>
                    {budgetDeviant !== 0 && <BudgetDiff diff={budgetDeviant} />}
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <p className="text-sm font-semibold whitespace-nowrap">TAMANHO</p>
                  <p>{target.size === 0 ? '?' : `${target.size}m2`}</p>
                </div>
                <div className="col-span-2 flex flex-col items-cente">
                  <p className="text-sm font-semibold whitespace-nowrap mb-1">ETAPA</p>
                  <div>
                    <StagePill stage={target.huntingStage} targetId={target.id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* COLLAPSED */}
      {isOpen && (
        <div
          className={
            'grid grid-cols-12 rounded-b-md border border-b-brand-primary-400 border-x-brand-primary-400 text-brand-primary-800 px-4 pt-3 pb-6'
          }
        >
          <div className="col-span-5 flex flex-col gap-5">
            <div className="w-full">
              <div className="w-full mb-4 p-0.5 border-b-[2px] border-b-brand-primary-700">
                <p className="text-xl font-medium">Imóvel</p>
              </div>
              <div className="w-full flex flex-wrap gap-x-6 gap-y-2">
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-2">
                    ENDEREÇO
                  </p>
                  <p>
                    {target.street}
                    {target.lotNumber && `, ${target.lotNumber}`}
                  </p>
                </div>
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-2">
                    COMPLEMENTO
                  </p>
                  <p>{target.number ?? '?'}</p>
                </div>
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-2">
                    BAIRRO
                  </p>
                  <p>{target.neighborhood ?? '?'}</p>
                </div>
                <div className="col-span-1 flex flex-col items-start">
                  <p className="text-sm font-semibold whitespace-nowrap text-brand-primary-900 mb-2">
                    CIDADE
                  </p>
                  <p>{target.city ?? '?'}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full mb-4 p-0.5 border-b-[2px] border-b-brand-primary-700">
                <p className="text-xl font-medium">Contato</p>
              </div>
              {!target.realtor && (
                <div className="w-full">
                  <p className="text-brand-gray-800">
                    Adicione informações do contato desse imóvel e ao final você pode avaliar o
                    atendimento
                  </p>
                </div>
              )}
              {!!target.realtor && (
                <div className="w-full flex flex-wrap gap-x-6 gap-y-2">
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-sm font-medium whitespace-nowrap text-brand-primary-900 mb-2">
                      IMOBILIÁRIA
                    </p>
                    <p>{target.realtor}</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-start">
                    <p className="text-sm font-medium whitespace-nowrap text-brand-primary-900 mb-2">
                      TELEFONE
                    </p>
                    <p>{target.realtorContact ?? '?'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-7"></div>
        </div>
      )}
      {isOpen && (
        <span className="text-sm absolute right-4 bottom-2 text-brand-primary-800">
          Última atualização {lastUpdateMessage(target.updatedAt)}
        </span>
      )}
    </div>
  )
}

function BudgetDiff({ diff }: { diff: number }) {
  const baseStyles = 'text-xs font-medium absolute -top-2 right-1 tracking-wider'

  if (diff > 0) {
    return <span className={cx('text-red-800', baseStyles)}>+{diff.toFixed(1)}%</span>
  }

  return <span className={cx('text-green-800', baseStyles)}>{diff.toFixed(1)}%</span>
}
