import brandLogo from '@/assets/logo/logo-type-tdv.png'

import OptimizedImage from '../base/image'

export function BrandName() {
  return (
    <OptimizedImage
      images={{
        desktop: {
          src: brandLogo,
          width: 100
        }
      }}
      alt="Logotipo com o nome da marca: Teto de Vidro"
    />
  )
}
