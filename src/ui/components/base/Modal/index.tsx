import type { ReactNode } from 'react'

import cx from 'classnames'

import Button from '../Button'

export type ModalSize = 'small' | 'medium' | 'large'

export interface ModalProps {
  children: ReactNode
  isOpen: boolean
  size?: ModalSize
  setClose: () => void
}

function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full absolute z-20 top-0 left-0 flex flex-col items-center py-16 bg-brand-gray-1000 bg-opacity-70">
      {children}
    </div>
  )
}

export default function Modal({ children, isOpen, size = 'small', setClose }: ModalProps) {
  const sizeClasses: { [_key in ModalSize]: string } = {
    small: 'md:min-w-[300px] md:w-[400px]',
    medium: 'md:min-w-128 md:w-128',
    large: 'md:min-w-10/12 md:w-9/12'
  }

  return (
    isOpen && (
      <ModalWrapper>
        <div
          className={cx(
            `!max-w-11/12 max-h-full overflow-x-scroll flex flex-col justify-start items-center mt-16 relative bg-white rounded-lg p-4`,
            sizeClasses[size]
          )}
        >
          <Button
            label="X"
            onClick={setClose}
            className={cx(
              'fixed right-4 top-4 z-25 rounded-full bg-white !h-7 !w-7 !min-w-7 flex justify-center items-center'
            )}
          />
          <div className="container">{children}</div>
        </div>
      </ModalWrapper>
    )
  )
}
