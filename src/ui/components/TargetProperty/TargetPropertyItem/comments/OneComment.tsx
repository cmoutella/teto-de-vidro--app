'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

import cx from 'classnames'
import { differenceInMinutes } from 'date-fns/differenceInMinutes'

import { useUIContext } from '@/providers/UIProvider'
import { deleteComment } from '@/requests/comments/delete'
import type { InterfaceComment } from '@/types/comment'
import Button from '@/ui/components/base/Button'
import Icon from '@/ui/components/base/Icon'
import DeleteConfirmation from '@/ui/forms/DeleteConfirmation'
import { lastUpdateMessage } from '@/utils/string/lastUpdateMessage'

interface OneCommentProps {
  comment: InterfaceComment
  isMyComment?: boolean
  updateCommentList: () => Promise<void>
}

export function OneComment({ comment, isMyComment, updateCommentList }: OneCommentProps) {
  const [showActions, setShowActions] = useState<boolean>(false)

  const { modal } = useUIContext()

  function handleEdit() {
    // TODO:
    console.log('COMMENT EDIT not implemented')
  }

  function openDeleteConfirmation() {
    function handleFail() {
      modal.close()
    }

    function handleSuccess() {
      modal.close()
    }

    async function removeComment() {
      const res = await deleteComment(comment.id)

      if (res) {
        toast.success('Comentário apagado')
        await updateCommentList()
      } else {
        toast.error('Algo deu errado')
      }
    }

    modal.open(
      'small',
      <DeleteConfirmation
        confirm={async () => await removeComment()}
        close={handleSuccess}
        onFail={handleFail}
      />
    )
  }

  const createdAtDate = new Date(comment.createdAt)

  const createdInLast15minutes = differenceInMinutes(new Date(), createdAtDate) < 15

  const commentColor = isMyComment ? 'bg-green-100' : 'bg-yellow-100'
  const corner = isMyComment ? 'rounded-br-none' : 'rounded-bl-none'

  return (
    <div
      className={cx('relative w-full rounded-2xl px-2.5 py-1.5', commentColor, corner)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showActions && (
        <div className={cx('flex items-center gap-2 absolute top-0 right-0 p-1.5', commentColor)}>
          {createdInLast15minutes && (
            <Button
              label={<Icon icon="pencil" mode="outline" className="w-3.5 h-3.5" />}
              onlyIcon={true}
              size="xsmall"
              className={cx(
                'text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
              )}
              onClick={() => handleEdit()}
            />
          )}
          {isMyComment && (
            <Button
              label={<Icon icon="trash" mode="outline" className="w-3.5 h-3.5" />}
              onlyIcon={true}
              size="xsmall"
              className={cx(
                'text-brand-primary-600 hover:border-red-500 hover:bg-red-500 hover:text-white'
              )}
              onClick={() => openDeleteConfirmation()}
            />
          )}
        </div>
      )}
      <p className="text-base mb-2.5">{comment.comment}</p>
      <p className="text-xs text-end">{lastUpdateMessage(comment.updatedAt)}</p>
    </div>
  )
}
