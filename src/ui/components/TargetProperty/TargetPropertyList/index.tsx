import type { InterfaceHunt } from '@/types/app'

import TargetPropertyItem from '../TargetPropertyItem'

interface TargetPropertyListProps {
  list: TargetPropertyInterface[]
  page: number
  totalPages: number
  perPage: number
  hunt: InterfaceHunt
}

function TargetPropertyList({
  list,
  page: _page,
  totalPages: _totalPages,
  perPage: _perPage,
  hunt: hunt
}: TargetPropertyListProps) {
  if (list.length <= 0) {
    return <>Ainda não tem nenhum imóvel</>
  }

  return (
    <div className="container flex flex-col gap-2">
      {list.map((tp) => {
        return (
          <div key={tp.id} className="w-full">
            <TargetPropertyItem target={tp} hunt={hunt} />
          </div>
        )
      })}
    </div>
  )
}

export default TargetPropertyList
