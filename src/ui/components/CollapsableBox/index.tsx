import type { ReactNode } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import cx from 'classnames'

interface CollapsableBoxProps {
  children: ReactNode
  label: string
  open: boolean
  toggleBox: () => void
}

function CollapsableBox({ open, label, children, toggleBox }: CollapsableBoxProps) {
  return (
    <Disclosure defaultOpen={open}>
      <DisclosureButton
        className={cx(
          'flex items-center gap-2 w-full p-4 bg-brand-gray-300 hover:bg-brand-gray-500 text-brand-primary-900 font-medium',
          {
            'rounded-t-lg': open,
            'rounded-lg': !open
          }
        )}
        onClick={toggleBox}
      >
        {label}
        {/* <ChevronDownIcon className={cx("w-5", { "rotate-180": open })} /> */}
      </DisclosureButton>
      <DisclosurePanel className="w-full border border-brand-gray-300 p-4 rounded-b-lg">
        {children}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default CollapsableBox
