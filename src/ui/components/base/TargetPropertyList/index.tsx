interface TargetPropertyListProps {
  list: TargetPropertyInterface[];
  page: number;
  totalPages: number;
  perPage: number;
}

function TargetPropertyList({
  list,
  page,
  totalPages,
  perPage,
}: TargetPropertyListProps) {
  if (list.length <= 0) {
    return <>Ainda não tem nenhum imóvel</>;
  }

  return (
    <div>
      {list.map((tp) => {
        return (
          <>
            {tp.id}: {tp.nickname}
          </>
        );
      })}
    </div>
  );
}

export default TargetPropertyList;
