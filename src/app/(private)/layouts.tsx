import type { ReactNode } from 'react'

import PrivateBasePage from '@template/PrivateBasePage'

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return <PrivateBasePage>{children}</PrivateBasePage>
}

export default PrivateLayout
