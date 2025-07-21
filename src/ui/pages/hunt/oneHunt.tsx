'use client'

import { toast } from 'react-hot-toast'

import Button from '@ui/base/Button'
import TargetPropertyList from '@ui/TargetProperty/TargetPropertyList'

import { HuntProvider, useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { InterfaceHunt } from '@/types/hunt'
import EditHuntForm from '@/ui/forms/Hunt/EditHunt'
import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

import { HuntParticipants } from './components/HuntParticipants'

interface HuntViewProps {
  hunt: InterfaceHunt
}

const HuntView = () => {
  const { hunt, targetsLeft, update } = useHuntContext()
  const { modal } = useUIContext()

  function handleCreateTargetProperty() {
    function handleSuccess() {
      update()
      modal.close()
      toast.success('Imóvel criado com sucesso!')
    }

    function handleFail(feedback: string) {
      toast.error(feedback)
    }

    modal.open(
      'large',
      <CreateTargetPropertyForm
        onSuccess={handleSuccess}
        onFail={handleFail}
        huntId={hunt?.id as never}
        huntSettings={hunt as InterfaceHunt}
      />
    )
  }

  function handleEditHunt() {
    function handleFail() {
      modal.close()
      toast.error('Não foi possível editar a hunt')
    }

    function handleSuccess(updatedHunt: InterfaceHunt) {
      update(updatedHunt)
      modal.close()
    }

    modal.open(
      'large',
      <EditHuntForm
        currentData={hunt as InterfaceHunt}
        onSuccess={handleSuccess}
        onFail={handleFail}
      />
    )
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center flex-col items-center px-3 sm:px-14 py-5 sm:py-10 gap-3">
        <div className="w-full flex justify-center mb-2 sm:mb-6">
          <div className="container">
            <div className="flex flex-col-reverse sm:flex-row sm:items-start w-full sm:justify-between gap-5">
              <div className="flex flex-col gap-y-1.5 justify-start items-start">
                <div className="flex flex-row items-center justify-start gap-x-2">
                  <h3 className="text-xl sm:text-3xl font-medium text-brand-primary-900">
                    # {(hunt as InterfaceHunt).title}
                  </h3>
                </div>
                <HuntParticipants huntUsers={hunt?.huntUsers ?? []} />
              </div>
              <div className="flex flex-row items-center justify-end gap-2">
                <Button
                  label="Editar Hunt"
                  className={
                    'border border-brand-primary-500 hover:bg-brand-primary-500 text-brand-primary-500 hover:text-white'
                  }
                  size="large"
                  onClick={handleEditHunt}
                />
                {targetsLeft >= 1 && (
                  <Button
                    label="Adicionar imóvel"
                    className={'bg-brand-primary-500 hover:bg-brand-primary-600 text-white'}
                    size="large"
                    onClick={handleCreateTargetProperty}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <TargetPropertyList />
      </div>
    </div>
  )
}

function OneHuntView({ hunt }: HuntViewProps) {
  return (
    <HuntProvider initialHuntData={hunt}>
      <HuntView />
    </HuntProvider>
  )
}

export default OneHuntView
