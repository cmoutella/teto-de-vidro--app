import c from 'classnames'
import type { StaticImageData } from 'next/image'

import Button from '@/ui/components/base/Button'
import OptimizedImage from '@/ui/components/base/image'
import { TrackingBullets } from '@/ui/components/TrackingBullets'

interface PresentationSlideProps {
  title: string
  description: string
  image: string | StaticImageData
  alt: string
  onNext: () => void
  onSkipSlideGroup?: () => void
  tracking: {
    current: number
    max: number
  }
}

export function PresentationSlideLayout({
  title,
  description,
  image,
  alt,
  onNext,
  onSkipSlideGroup,
  tracking
}: PresentationSlideProps) {
  return (
    <div className="w-full h-full bg-white md:bg-brand-primary-600 flex justify-center items-center">
      <div className="w-full h-full md:max-w-[800px] lg:max-w-[1000px] md:max-h-[600px] bg-white md:rounded-3xl flex flex-col justify-end items-center">
        <div className="flex flex-col md:flex-row justify-between items-center h-full w-full">
          <div className="md:px-4 md:py-8 md:w-1/2 max-h-[40%] md:max-h-full">
            <OptimizedImage
              alt={alt}
              images={{
                desktop: {
                  src: image
                }
              }}
              className="max-w-[330px] md:max-w-full"
            />
          </div>
          <div className="md:h-auto w-full md:w-1/2 px-3 py-4 md:px-8 md:py-8 bg-brand-primary-600 md:bg-white rounded-t-2xl text-white md:text-brand-gray-900 flex flex-col justify-center items-center">
            <div className="mb-5 md:hidden">
              <TrackingBullets {...tracking} bulletColor="bg-white md:bg-brand-primary-600" />
            </div>
            <div className="flex flex-col justify-between items-center gap-6 md:gap-14 max-w-[330px] md:max-w-[400px]">
              <div className="">
                <h1
                  className="text-xl lg:text-2xl flex flex-col text-center mb-6 md:mb-10"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p
                  className="text-sm lg:text-base text-center"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
              <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:gap-3">
                {onSkipSlideGroup && (
                  <Button
                    label="Pular"
                    onClick={onSkipSlideGroup}
                    size="large"
                    className={c('bg-brand-gray-200 text-black w-full py-3')}
                  />
                )}
                <Button
                  label="Continuar"
                  onClick={onNext}
                  size="large"
                  className={c('bg-highlight-brand text-black w-full py-3')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block mb-8">
          <TrackingBullets {...tracking} bulletColor="bg-white md:bg-brand-primary-600" />
        </div>
      </div>
    </div>
  )
}
