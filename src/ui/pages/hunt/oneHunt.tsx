'use client'

import { useState } from 'react'

import Button from '@ui/base/Button'
import TargetPropertyList from '@ui/TargetProperty/TargetPropertyList'

import { HuntProvider, useHuntContext } from '@/providers/HuntProvider'
import type { InterfaceHunt } from '@/types/app'
import type { TargetPropertyInterface } from '@/types/targetProperty'

import CreateTargetPropertyModal from './components/CreateTargetPropertyModal'
import { EditHuntModal } from './components/EditHuntModal'
import { EditTargetPropertyModal } from './components/EditTargetPropertyModal'

interface HuntViewProps {
  hunt: InterfaceHunt
}

const HuntView = () => {
  const { hunt, properties, page, totalPages } = useHuntContext()

  // Modal
  const [isTargetPropertyCreateModalOpen, setIsTargetPropertyCreateModalOpen] =
    useState<boolean>(false)
  const [isEditHuntModalOpen, setIsEditHuntModalOpen] = useState<boolean>(false)
  const [isEditTargetPropertyModalOpen, setIsEditTargetPropertyModalOpen] = useState<boolean>(false)
  const [editTargetProperty, setEditTargetProperty] = useState<TargetPropertyInterface | undefined>(
    undefined
  )

  function openEditTargetModal(target: TargetPropertyInterface) {
    setIsEditTargetPropertyModalOpen(true)
    setEditTargetProperty(target)
  }
  function closeEditTargetModal() {
    setIsEditTargetPropertyModalOpen(false)
    setEditTargetProperty(undefined)
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
                  onClick={() => {
                    setIsEditHuntModalOpen(true)
                  }}
                />
                <Button
                  label="Adicionar imóvel"
                  className={'bg-brand-primary-500 hover:bg-brand-primary-600 text-white'}
                  size="large"
                  onClick={() => {
                    setIsTargetPropertyCreateModalOpen(true)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <TargetPropertyList
          list={properties}
          page={page}
          totalPages={totalPages}
          perPage={8}
          openEditModal={openEditTargetModal}
        />
      </div>
      <CreateTargetPropertyModal
        huntId={(hunt as InterfaceHunt).id}
        isOpen={isTargetPropertyCreateModalOpen}
        setClose={() => {
          setIsTargetPropertyCreateModalOpen(false)
        }}
      />
      <EditHuntModal
        isOpen={isEditHuntModalOpen}
        setClose={() => {
          setIsEditHuntModalOpen(false)
        }}
      />
      <EditTargetPropertyModal
        isOpen={isEditTargetPropertyModalOpen}
        setClose={closeEditTargetModal}
        target={editTargetProperty}
      />
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
