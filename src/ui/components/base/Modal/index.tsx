import type { ReactNode } from 'react'

import cx from 'classnames'

import Button from '../Button'
import Icon from '../Icon'

export type ModalSize = 'small' | 'medium' | 'large'

export interface ModalProps {
  children: ReactNode
  isOpen: boolean
  size?: ModalSize
  setClose: () => void
}

function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full max-h-screen fixed z-20 top-0 left-0 flex flex-col items-center py-16 px-4 md:px-0 bg-brand-gray-1000 bg-opacity-70">
      {children}
    </div>
  )
}

export default function Modal({ children, isOpen, size = 'small', setClose }: ModalProps) {
  const sizeClasses: { [_key in ModalSize]: string } = {
    small: 'md:min-w-[300px] md:w-[400px]',
    medium: 'md:min-w-6/12 md:w-6/12',
    large: 'md:min-w-10/12 md:w-9/12'
  }

  return (
    isOpen && (
      <ModalWrapper>
        <div
          className={cx(
            `!max-w-11/12 max-h-[75vh] flex flex-col justify-start items-center mt-8 md:mt-16 bg-white rounded-lg box-border relative`,
            sizeClasses[size]
          )}
        >
          <Button
            label={<Icon icon="x" />}
            onClick={setClose}
            className={cx(
              'absolute self-end top-2 right-2 md:top-3 md:right-3 !z-9999 rounded-full bg-white !h-7 !w-7 !min-w-7 flex justify-center items-center'
            )}
          />
          <div className="container overflow-y-scroll p-4 -z-1 max-h-full">{children}</div>
        </div>
      </ModalWrapper>
    )
  )
}
