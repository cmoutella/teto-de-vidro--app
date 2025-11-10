'use client'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'

import cx from 'classnames'

import { featureAvailable } from '@/config/features'
import { useSessionContext } from '@/providers/AuthProvider'
import { useHuntContext } from '@/providers/HuntProvider'
import { useUIContext } from '@/providers/UIProvider'
import type { HuntParticipant, InterfaceHunt } from '@/types/hunt'
import Button from '@/ui/components/base/Button'
import InviteUserForm from '@/ui/forms/Hunt/InviteUsers'

interface HuntParticipantsProps {
  hunt: InterfaceHunt
  participants: HuntParticipant[]
  isLoading: boolean
}

export function HuntParticipants({ hunt, participants, isLoading }: HuntParticipantsProps) {
  const { user, updatePermissions } = useSessionContext()
  const { update } = useHuntContext()
  const { modal } = useUIContext()

  const huntUsers = useMemo(() => {
    return participants!.filter((u) => user && u.id !== user.id) ?? []
  }, [participants, user])

  if (isLoading) {
    return (
      <div className="w-full bg-brand-gray-600 opacity-50 h-6 rounded-sm animation-pulse"></div>
    )
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
      <InviteUserForm
        huntId={hunt?.id as never}
        onSuccess={onSuccess}
        onFail={onFail}
        invitationLimit={user?.permissions?.invitationsLimit ?? 0}
        currentUser={user}
      />
    )
  }

  function listConnections(index: number) {
    if (index >= participants.length - 1) {
      return
    } else if (index === participants.length - 2) {
      return ' e '
    } else {
      return ', '
    }
  }

  const canInvite = featureAvailable('invites', user)

  return (
    <div className="flex justify-start items-end gap-3">
      {huntUsers.length >= 1 && (
        <div className="leading-none">
          Com{' '}
          {huntUsers.map((p, i) => {
            return (
              <span key={p.id}>
                <span>{p.name}</span>
                {listConnections(i)}
              </span>
            )
          })}
        </div>
      )}
      {canInvite && (user?.permissions?.invitationsLimit ?? 0) >= 1 && (
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
      )}
    </div>
  )
}
