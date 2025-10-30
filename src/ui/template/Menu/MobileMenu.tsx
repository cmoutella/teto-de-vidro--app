import { useRouter } from 'next/navigation'

import Button from '@/ui/components/base/Button'
import Icon from '@/ui/components/base/Icon'

interface MobileMenuProps {
  onClose: () => void
  translateHeight: number
}

export function MobileMenu({ onClose, translateHeight }: MobileMenuProps) {
  const router = useRouter()

  return (
    <div
      className={`w-full  md:hidden absolute top-0 bg-brand-primary-900 z-[99]`}
      style={{ transform: `translateY(${translateHeight - 10}px)` }}
    >
      <div className="w-full flex flex-col text-white text-base pt-4 -gap-1">
        <Button
          label={
            <span className="flex items-center justify-center">
              Fazer login <Icon icon="arrow-right-in" className="ml-2" />
            </span>
          }
          className="w-full h-12"
          onClick={() => router.push('/login')}
        />
        <Button
          label="Como funciona"
          className="w-full h-12"
          onClick={() => router.push('/como-funciona')}
        />
        <Button label={`Fechar menu`} className="w-full h-12" onClick={onClose} />
      </div>
      <div className="w-full flex justify-center my-1.5">
        <div className="w-20 h-1 rounded-lg bg-brand-primary-300 opacity-70"></div>
      </div>
    </div>
  )
}
