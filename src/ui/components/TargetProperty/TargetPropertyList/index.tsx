import { useHuntContext } from '@/providers/HuntProvider'
import type { InterfaceHunt } from '@/types/hunt'

import { Pagination } from '../../Pagination'
import TargetPropertyItem from '../TargetPropertyItem'

function TargetPropertyList() {
  const { hunt, properties, page } = useHuntContext()

  if (properties.length <= 0) {
    return <>Ainda não tem nenhum imóvel</>
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
