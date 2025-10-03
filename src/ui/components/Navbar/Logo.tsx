'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import brandLogo from '@/assets/logo/logo-tdv.png'

export function NavLogo() {
  const router = useRouter()

  return (
    <div
      className="font-medium cursor-pointer flex items-center justify-center text-brand-primary-200 gap-3"
      onClick={() => router.push('/')}
    >
      <Image src={brandLogo} alt="Logotipo da Teto de Vidro" width={100} />
      <span className="font-medium text-base text-brand-primary-900">Teto de Vidro</span>
    </div>
  )
}
