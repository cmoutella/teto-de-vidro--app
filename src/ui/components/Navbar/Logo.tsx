'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logoType from '@/assets/logo/logotype.png'

export function NavLogo() {
  const router = useRouter()

  return (
    <div
      className="font-medium cursor-pointer flex items-center justify-center text-brand-primary-200"
      onClick={() => router.push('/')}
    >
      <Image src={logoType} alt="Logotipo da Teto de Vidro" width={130} />
    </div>
  )
}
