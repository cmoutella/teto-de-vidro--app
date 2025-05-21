import { useEffect, useState } from 'react'

import cx from 'classnames'

import { useSessionContext } from '@/providers/AuthProvider'
import { getTargetComments } from '@/requests/targetProperty/comments/getComment'
import type { InterfaceComment } from '@/types/comment'
import Button from '@/ui/components/base/Button'
import Icon from '@/ui/components/base/Icon'
import { Pagination } from '@/ui/components/Pagination'

import { OneComment } from './OneComment'

interface CommentsDisplayProps {
  targetId: string
}

export function CommentsDisplay({ targetId }: CommentsDisplayProps) {
  const [comments, setComments] = useState<InterfaceComment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const perPage = 6

  const { user } = useSessionContext()

  useEffect(() => {
    getComments()
  }, [page])

  async function getComments() {
    try {
      setIsLoading(true)
      const data = await getTargetComments(targetId as never, page, perPage)

      if (!data) {
        setComments([])
        setMaxPage(1)
        return
      }

      setComments(data.list)
      setMaxPage(data.totalPages)
    } finally {
      setIsLoading(false)
    }
  }

  function newComment() {
    // TODO
    console.log('COMMENT NEW not implemented')
  }

  return (
    <div className="w-full">
      <div className="w-full mb-4 p-0.5 border-b-[2px] border-b-brand-primary-700 flex justify-between items-center">
        <p className="sm:text-xl font-medium">Comentários</p>
        <div>
          <Button
            label={<Icon icon="recycle" mode="outline" className="w-3.5 h-3.5" />}
            onlyIcon={true}
            size="xsmall"
            className={cx(
              'text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
            )}
            onClick={() => getComments()}
          />
          <Button
            label={<Icon icon="plus" mode="outline" className="w-3.5 h-3.5" />}
            onlyIcon={true}
            size="xsmall"
            className={cx(
              'text-brand-primary-600 hover:border-brand-primary-600 hover:bg-brand-primary-600 hover:text-white'
            )}
            onClick={() => newComment()}
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-x-2 gap-y-3 sm:gap-y-2">
        <div className="w-full flex flex-col items-start gap-y-1">
          {!isLoading &&
            comments.length >= 1 &&
            comments.map((comm) => {
              return (
                <div
                  key={comm.id}
                  className={cx('w-3/4', {
                    'self-end': user?.id === comm.author
                  })}
                >
                  <OneComment comment={comm} isMyComment={user?.id === comm.author} />
                </div>
              )
            })}
        </div>
        <Pagination
          currentPage={page}
          maxPage={maxPage}
          toPage={(p) => setPage(p)}
          isFirstPage={page === 1}
          isLastPage={page === maxPage}
          nextPage={() => setPage(page + 1)}
          prevPage={() => setPage(page - 1)}
        />
      </div>
    </div>
  )
}
