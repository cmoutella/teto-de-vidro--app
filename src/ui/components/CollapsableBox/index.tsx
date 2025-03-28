import type { ReactNode } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import cx from 'classnames'

import Icon from '../base/Icon'

interface CollapsableBoxProps {
  children: ReactNode
  label: string
  open: boolean
  toggleBox: () => void
  resume?: string
}

function CollapsableBox({ open, label, resume, children, toggleBox }: CollapsableBoxProps) {
  return (
    <Disclosure defaultOpen={open}>
      <DisclosureButton
        className={cx(
          'flex items-center gap-2 w-full p-4 text-brand-primary-900 font-medium',
          {
            'rounded-t-lg': open,
            'rounded-lg': !open
          },
          {
            'bg-brand-gray-200 hover:bg-brand-gray-600 hover:text-white': !open,
            'bg-brand-gray-600 text-white': open
          }
        )}
        onClick={toggleBox}
      >
        <span className="w-full flex flex-row items-center justify-start gap-5">
          <span>{label}</span>
          {resume && !open && (
            <span className="text-sm font-normal opacity-85 leading-none translate-y-0.5">
              {resume}
            </span>
          )}
        </span>
        {open ? <Icon icon="chevron-up" /> : <Icon icon="chevron-down" />}
      </DisclosureButton>
      <DisclosurePanel className="w-full border border-brand-gray-300 p-4 rounded-b-lg">
        {children}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default CollapsableBox
