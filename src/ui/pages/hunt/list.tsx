'use client'

import Button from '@ui/base/Button'
import cx from 'classnames'
import { useRouter } from 'next/navigation'

import type { InterfaceHunt } from '@/types/app'

interface ListHuntViewInterface {
  hunts: InterfaceHunt[]
}

const ListHuntView = ({ hunts }: ListHuntViewInterface) => {
  const router = useRouter()

  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <div className="container">
        <h3 className="mb-4">Página de listagem de hunts: {hunts.length}</h3>
        {hunts.map((hunt) => (
          <div
            key={hunt.id}
            className="w-1/3 flex justify-between items-center px-3 py-4 rounded-lg border border-brand-primary-400"
          >
            <h6>{hunt.title ?? hunt.id}</h6>
            <Button
              label="Acessar"
              onClick={() => router.push(`/hunt/${hunt.id}`)}
              className={cx('bg-brand-primary-600 text-white')}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListHuntView
