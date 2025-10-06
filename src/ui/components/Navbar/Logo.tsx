'use client'
import { useRouter } from 'next/navigation'

import brandLogo from '@/assets/logo/logo-tdv.png'

import OptimizedImage from '../base/image'

export function NavLogo() {
  const router = useRouter()

  return (
    <div
      className="font-medium cursor-pointer flex items-center justify-center text-brand-primary-200 gap-3"
      onClick={() => router.push('/')}
    >
      <OptimizedImage
        images={{
          mobile: {
            src: brandLogo,
            width: 70
          },
          desktop: {
            src: brandLogo,
            width: 100
          }
        }}
        alt="Logotipo da Teto de Vidro"
        priority={true}
      />
      <span className="hidden sm:block font-medium text-base text-brand-primary-900">
        Teto de Vidro
      </span>
    </div>
  )
}
