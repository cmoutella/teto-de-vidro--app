import type { ReactNode } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

interface CollapsableBoxProps {
  children: ReactNode
  label: string
  open: boolean
  toggleBox: () => void
}

function CollapsableBox({ open, label, children, toggleBox }: CollapsableBoxProps) {
  return (
    <Disclosure defaultOpen={open}>
      <DisclosureButton className="flex items-center gap-2 w-full" onClick={toggleBox}>
        {label}
        {/* <ChevronDownIcon className={cx("w-5", { "rotate-180": open })} /> */}
      </DisclosureButton>
      <DisclosurePanel className="w-full">{children}</DisclosurePanel>
    </Disclosure>
  )
}

export default CollapsableBox
