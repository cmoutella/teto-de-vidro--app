'use client'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import cx from 'classnames'

import { useSessionContext } from '@/providers/AuthProvider'
import { useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { HuntParticipant, InterfaceHunt } from '@/types/app'
import Button from '@/ui/components/base/Button'
import { Loading } from '@/ui/components/base/Loading'
import InviteUserForm from '@/ui/forms/Hunt/InviteUsers'

interface HuntParticipantsProps {
  huntUsers: HuntParticipant[]
}

export function HuntParticipants({ huntUsers }: HuntParticipantsProps) {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const { user, updatePermissions } = useSessionContext()
  const { hunt, update } = useHuntContext()
  const { modal } = useUIContext()

  const participants = useMemo(() => {
    return huntUsers.filter((u) => user && u.id !== user.id) ?? []
  }, [huntUsers, user])

  if (!ready) {
    return <Loading />
  }

  function handleInviteModal() {
    async function onSuccess(updatedHunt: InterfaceHunt) {
      update(updatedHunt)
      await updatePermissions()
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

  return (
    <div className="flex justify-start items-end gap-3">
      {participants.length >= 1 && (
        <div className="leading-none">
          Com{' '}
          {participants.map((p, i) => {
            return (
              <span key={p.id}>
                <span>{p.name}</span> {i < participants.length - 1 && 'e '}
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
  )
}
