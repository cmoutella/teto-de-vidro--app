import { useState } from 'react'

import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import { useUIContext } from '@/providers/UIProvider'

interface ImageConfig {
  src: StaticImageData | string
  width?: number
  height?: number
  alt?: string
}

interface ImageSet {
  mobile: ImageConfig
  tablet?: ImageConfig
  desktop: ImageConfig
  large?: ImageConfig
}

interface OptimizedImageProps {
  images: ImageSet
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  images,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)

  const { mounted, device } = useUIContext()

  const handleLoad = (): void => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = (): void => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Evita hydration mismatch - renderiza versão desktop no servidor
  if (!mounted) {
    return (
      <Image
        src={images.desktop.src}
        alt={alt}
        width={images.desktop.width || undefined}
        height={images.desktop.height || undefined}
        priority={priority}
        className={className}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    )
  }

  const getCurrentImage = (): ImageConfig => {
    switch (device) {
      case 'mobile':
        return images.mobile
      case 'tablet':
        return images.tablet || images.desktop
      case 'large':
        return images.large || images.desktop
      case 'desktop':
      default:
        return images.desktop
    }
  }

  const currentImage = getCurrentImage()

  // Renderização de fallback em caso de erro
  if (hasError) {
    return (
      <div
        className={`image-error ${className} w-full bg-slate-200`}
        style={{
          height: currentImage.height
        }}
      >
        <span>Erro ao carregar imagem</span>
      </div>
    )
  }

  return (
    <Image
      src={currentImage.src}
      alt={alt}
      width={currentImage.width || undefined}
      height={currentImage.height || undefined}
      priority={priority}
      className={className}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s ease'
      }}
    />
  )
}
