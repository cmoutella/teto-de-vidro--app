import cx from 'classnames'
import type { StaticImageData } from 'next/image'

import Button from '../base/Button'
import OptimizedImage from '../base/image'

interface EmptyStateProps {
  description: string
  action: {
    label: string
    do: () => void
  }
  image?: {
    src: StaticImageData
    alt: string
  }
}

export default function EmptyState({ action, description, image }: EmptyStateProps) {
  return (
    <div
      className={cx('w-full flex flex-col justify-center items-center', {
        'py-3 px-4': true,
        'py-4 px-4': false
      })}
    >
      {image && (
        <OptimizedImage
          alt={image.alt}
          images={{
            desktop: {
              src: image.src,
              width: 300
            }
          }}
        />
      )}
      <p className="text-xl text-brand-primary-600 font-medium mb-10 -mt-4">{description}</p>
      {action && (
        <Button
          label={action.label}
          size="large"
          className={cx('bg-brand-primary-700 text-white hover:bg-brand-primary-800')}
          onClick={action.do}
        />
      )}
    </div>
  )
}
