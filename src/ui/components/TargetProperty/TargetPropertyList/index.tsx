import approvedPropertyImg from '@/assets/images/property-approved.png'
import { useHuntContext } from '@/providers/HuntProvider'
import type { InterfaceHunt } from '@/types/hunt'

import EmptyState from '../../EmptyState'
import { Pagination } from '../../Pagination'
import TargetPropertyItem from '../TargetPropertyItem'

interface TargetPropertyListProps {
  ctaEmptyListAction: () => void
}

function TargetPropertyList({ ctaEmptyListAction }: TargetPropertyListProps) {
  const { hunt, properties, page } = useHuntContext()

  if (properties.length <= 0) {
    return (
      <EmptyState
        description="Tem algum imóvel que você gostou? Inclua ele na sua lista!"
        image={{ src: approvedPropertyImg, alt: 'Uma casa agradável com um símbolo de aprovado' }}
        action={{
          label: 'Começar agora!',
          do: ctaEmptyListAction
        }}
      />
    )
  }

  return (
    <div className="container flex flex-col gap-2">
      {properties.map((tp) => {
        return (
          <div key={tp.id} className="w-full">
            <TargetPropertyItem target={tp} hunt={hunt as InterfaceHunt} />
          </div>
        )
      })}
      <div className="w-full mt-6">
        <Pagination
          currentPage={page.current}
          maxPage={page.total}
          toPage={page.setPage}
          nextPage={page.nextPage}
          prevPage={page.prevPage}
          isFirstPage={page.isFirstPage}
          isLastPage={page.isLastPage}
        />
      </div>
    </div>
  )
}

export default TargetPropertyList
