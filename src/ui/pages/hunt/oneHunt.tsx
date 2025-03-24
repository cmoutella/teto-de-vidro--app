'use client'

import { useEffect, useState } from 'react'

import { getAllTargetPropertiesfromHunt } from '@requests/hunt/getAllTargetProperties'
import Button from '@ui/base/Button'
import TargetPropertyList from '@ui/TargetProperty/TargetPropertyList'

import type { InterfaceHunt } from '@/types/app'

import CreateTargetPropertyModal from './components/CreateTargetPropertyModal'
import { DEFAULT_HUNT_LIST_PER_PAGE } from './consts/perPage'

interface HuntViewProps {
  hunt: InterfaceHunt
}

const OneHuntView = ({ hunt }: HuntViewProps) => {
  const [page, _setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [perPage, _setPerPage] = useState<number>(DEFAULT_HUNT_LIST_PER_PAGE)
  const [properties, setProperties] = useState<TargetPropertyInterface[]>([])

  // Modal
  const [isTargetPropertyCreateModalOpen, setIsTargetPropertyCreateModalOpen] =
    useState<boolean>(false)

  function handleUpdateSuccess() {
    fetchPropertiesData()
  }

  useEffect(() => {
    fetchPropertiesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchPropertiesData() {
    const data = await getAllTargetPropertiesfromHunt(hunt.id, page, perPage)

    if (!data || data.length <= 0) {
      // TODO: tooltip de feedback
      setTotalPages(0)
    }

    setProperties(data as TargetPropertyInterface[])
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        <div className="w-full flex justify-center mb-6">
          <div className="container">
            <div className="flex flex-row items-start w-full justify-between">
              <div className="flex flex-col gap-y-1.5 justify-start items-start">
                <div className="flex flex-row items-center justify-start gap-x-2">
                  <h3 className="text-2xl font-medium text-brand-primary-900"># {hunt.title}</h3>
                  {/* icone clicável */}
                </div>
                {hunt.invitedUsers && hunt.invitedUsers?.length >= 1 && (
                  <div>Com Fulana e fulana</div>
                )}
              </div>
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
        <TargetPropertyList list={properties} page={page} totalPages={totalPages} perPage={8} />
      </div>
      <CreateTargetPropertyModal
        huntId={hunt.id}
        isOpen={isTargetPropertyCreateModalOpen}
        setClose={() => {
          setIsTargetPropertyCreateModalOpen(false)
        }}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  )
}

export default OneHuntView
