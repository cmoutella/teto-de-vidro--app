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
              <Icon icon="arrow-right-in" className="mr-2" /> Fazer login
            </span>
          }
          className="w-full h-12"
          onClick={() => router.push('/login')}
        />
        <Button
          label={
            <span className="flex items-center justify-center">
              <Icon icon="question-mark" className="mr-2" /> Como funciona?
            </span>
          }
          className="w-full h-12"
          onClick={() => router.push('/como-funciona')}
        />
        <Button
          label={
            <span className="flex items-center justify-center">
              <Icon icon="x" className="mr-2" /> Fechar menu
            </span>
          }
          className="w-full h-12"
          onClick={onClose}
        />
      </div>
      <div className="w-full flex justify-center my-1.5">
        <div className="w-20 h-1 rounded-lg bg-brand-primary-300 opacity-70"></div>
      </div>
    </div>
  )
}
