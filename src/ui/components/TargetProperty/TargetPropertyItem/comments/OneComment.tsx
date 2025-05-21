'use client'
import { useState } from 'react'

import cx from 'classnames'
import { differenceInMinutes } from 'date-fns/differenceInMinutes'

import type { InterfaceComment } from '@/types/comment'
import Button from '@/ui/components/base/Button'
import Icon from '@/ui/components/base/Icon'
import { lastUpdateMessage } from '@/utils/string/lastUpdateMessage'

interface OneCommentProps {
  comment: InterfaceComment
  isMyComment?: boolean
}

export function OneComment({ comment, isMyComment }: OneCommentProps) {
  const [showActions, setShowActions] = useState<boolean>(false)

  function handleEdit() {
    // TODO:
    console.log('COMMENT EDIT not implemented')
  }

  function handleErase() {
    // TODO:
    console.log('COMMENT DELETE not implemented')
  }

  const createdAtDate = new Date(comment.createdAt)

  const createdInLast15minutes = differenceInMinutes(new Date(), createdAtDate) < 15

  const commentColor = isMyComment ? 'bg-green-100' : 'bg-yellow-100'

  return (
    <div
      className={cx('relative w-full rounded-xl px-2.5 py-1.5', commentColor)}
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
              onClick={() => handleErase()}
            />
          )}
        </div>
      )}
      <p className="text-base mb-2.5">{comment.comment}</p>
      <p className="text-xs text-end">{lastUpdateMessage(comment.updatedAt)}</p>
    </div>
  )
}
