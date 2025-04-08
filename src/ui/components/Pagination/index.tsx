import { useMemo, type ReactNode } from 'react'

import cx from 'classnames'

import Icon from '../base/Icon'

interface PaginationProps {
  currentPage: number
  nextPage: () => void
  prevPage: () => void
  toPage: (_p: number) => void
  isFirstPage: boolean
  isLastPage: boolean
  maxPage: number
}

interface PagePillProps {
  isCurrentPage?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
  isIcon?: boolean
}

function PagePill({
  isCurrentPage = false,
  disabled = false,
  onClick,
  children,
  isIcon = false
}: PagePillProps) {
  return (
    <div
      className={cx(
        'leading-0 min-w-8 h-6 px-2 flex justify-center items-center rounded-2xl text-xs font-medium text-center',
        {
          'bg-brand-primary-200 hover:bg-brand-primary-600 hover:text-white cursor-pointer':
            !isCurrentPage && !disabled,
          'bg-brand-primary-400': isCurrentPage,
          'bg-brand-gray-100 disabled:bg-brand-gray-100': disabled
        },
        {
          'py-1 pt-1.5': !isIcon,
          'py-0': isIcon
        }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function Pagination({
  currentPage,
  nextPage,
  prevPage,
  toPage,
  isFirstPage,
  isLastPage,
  maxPage
}: PaginationProps) {
  const pages = useMemo(() => {
    const pageNumbers = []

    if (maxPage <= 5) {
      for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, 5)
      } else if (currentPage >= maxPage - 2) {
        for (let i = maxPage - 4; i <= maxPage; i++) {
          pageNumbers.push(i)
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i)
        }
      }
    }

    return pageNumbers
  }, [maxPage, currentPage])

  return (
    <div className="w-full flex justify-center items-center gap-2">
      {maxPage > 5 && (
        <PagePill onClick={prevPage} disabled={isFirstPage} isIcon={true}>
          <div className="w-4 h-3 flex items-center">
            <Icon icon="chevron-left" mode="micro" />
          </div>
        </PagePill>
      )}
      {pages.map((page) => {
        return (
          <PagePill
            isCurrentPage={page === currentPage}
            onClick={() => toPage(page)}
            key={`page-${page}`}
          >
            {page}
          </PagePill>
        )
      })}
      {maxPage > 5 && (
        <PagePill onClick={nextPage} disabled={isLastPage} isIcon={true}>
          <div className="w-4 h-3 flex items-center">
            <Icon icon="chevron-right" mode="micro" />
          </div>
        </PagePill>
      )}
    </div>
  )
}
