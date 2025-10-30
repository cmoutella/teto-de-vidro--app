import { useRouter } from 'next/navigation'

import Button from '@/ui/components/base/Button'

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const router = useRouter()

  return (
    <div className="w-full flex flex-col md:hidden absolute top-0 bg-brand-primary-900 text-white text-base z-[99]">
      <Button label="Fazer login" className="w-full py-3" onClick={() => router.push('/login')} />
      <Button label="Fechar" className="w-full py-3" onClick={onClose} />
    </div>
  )
}
