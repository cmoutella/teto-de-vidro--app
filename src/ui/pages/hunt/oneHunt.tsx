'use client'

import Button from '@ui/base/Button'
import TargetPropertyList from '@ui/TargetProperty/TargetPropertyList'

import { HuntProvider, useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { InterfaceHunt } from '@/types/app'
import EditHuntForm from '@/ui/forms/Hunt/EditHunt'
import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

interface HuntViewProps {
  hunt: InterfaceHunt
}

const HuntView = () => {
  const { hunt, properties, page, totalPages, update } = useHuntContext()

  const { modal } = useUIContext()

  function handleCreateTargetProperty() {
    function onSuccess() {
      update()
    }

    function handleSuccess() {
      onSuccess()
      modal.close()
    }

    function handleFail() {
      // TODO: CreateTargetProperty handle fail
      console.log('fail')
    }

    modal.open(
      'large',
      <CreateTargetPropertyForm
        onSuccess={handleSuccess}
        onFail={handleFail}
        huntId={hunt?.id as never}
      />
    )
  }

  function handleEditHunt() {
    function handleFail() {
      // TODO: EditHunt handle fail
      console.log('fail EditHunt')
    }

    function onSuccess(updatedHunt: InterfaceHunt) {
      update(updatedHunt)
    }

    function handleSuccess(updatedHunt: InterfaceHunt) {
      onSuccess(updatedHunt)
      modal.close
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
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        <div className="w-full flex justify-center mb-6">
          <div className="container">
            <div className="flex flex-row items-start w-full justify-between">
              <div className="flex flex-col gap-y-1.5 justify-start items-start">
                <div className="flex flex-row items-center justify-start gap-x-2">
                  <h3 className="text-2xl font-medium text-brand-primary-900">
                    # {(hunt as InterfaceHunt).title}
                  </h3>
                </div>
                {(hunt as InterfaceHunt).invitedUsers &&
                  (hunt as InterfaceHunt).invitedUsers?.length >= 1 && (
                    <div>Com Fulana e fulana</div>
                  )}
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
                <Button
                  label="Adicionar imóvel"
                  className={'bg-brand-primary-500 hover:bg-brand-primary-600 text-white'}
                  size="large"
                  onClick={handleCreateTargetProperty}
                />
              </div>
            </div>
          </div>
        </div>
        <TargetPropertyList list={properties} page={page} totalPages={totalPages} perPage={8} />
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
