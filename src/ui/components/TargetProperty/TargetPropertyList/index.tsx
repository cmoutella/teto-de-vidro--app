import TargetPropertyItem from '../TargetPropertyItem'

interface TargetPropertyListProps {
  list: TargetPropertyInterface[]
  page: number
  totalPages: number
  perPage: number
}

function TargetPropertyList({
  list,
  page: _page,
  totalPages: _totalPages,
  perPage: _perPage
}: TargetPropertyListProps) {
  if (list.length <= 0) {
    return <>Ainda não tem nenhum imóvel</>
  }

  return (
    <div className="container">
      {list.map((tp) => {
        return (
          <div key={tp.id} className="w-full">
            <TargetPropertyItem target={tp} />
          </div>
        )
      })}
    </div>
  )
}

export default TargetPropertyList
