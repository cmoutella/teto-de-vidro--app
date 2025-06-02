'use client'

import { toast } from 'react-hot-toast'

import Button from '@ui/base/Button'
import TargetPropertyList from '@ui/TargetProperty/TargetPropertyList'
import cx from 'classnames'

import { useSessionContext } from '@/providers/AuthProvider'
import { HuntProvider, useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { InterfaceHunt } from '@/types/app'
import EditHuntForm from '@/ui/forms/Hunt/EditHunt'
import InviteUserForm from '@/ui/forms/Hunt/InviteUsers'
import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

interface HuntViewProps {
  hunt: InterfaceHunt
}

const HuntView = () => {
  const { hunt, update } = useHuntContext()
  const { user } = useSessionContext()
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

  function handleInviteModal() {
    function onSuccess(updatedHunt: InterfaceHunt) {
      update(updatedHunt)
      toast('Convites enviados')
    }
    function onFail() {
      toast('Não foi possível enviar os convites')
    }
    modal.open(
      'medium',
      <InviteUserForm huntId={hunt?.id as never} onSuccess={onSuccess} onFail={onFail} />
    )
  }

  const participants = hunt?.huntUsers?.filter((u) => user && u.id !== user.id) ?? []

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
                <div className="flex justify-start items-end gap-3">
                  {participants.length >= 1 && (
                    <div className="leading-none">
                      Com{' '}
                      {participants.map((p, i) => {
                        return (
                          <span key={p.id}>
                            <span>{p.name}</span> {i < participants.length - 1 && 'e'}
                          </span>
                        )
                      })}
                    </div>
                  )}
                  <Button
                    label="Convide alguém"
                    onClick={handleInviteModal}
                    size="xsmall"
                    className={cx(
                      {
                        'text-white bg-brand-primary-400 hover:bg-brand-primary-500 !py-1 px-2':
                          participants.length <= 0,
                        'text-sky-600 hover:text-sky-700 underline hover:underline-offset-1 hover:scale-105 !pb-0':
                          participants.length >= 1
                      },
                      'text-medium '
                    )}
                  />
                </div>
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
