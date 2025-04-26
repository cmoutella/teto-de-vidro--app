import type { ReactNode } from 'react'

export function FormSectionLabel({ children }: { children: ReactNode | string }) {
  return (
    <div className="col-span-12 mb-2 text-brand-primary-900 font-semibold uppercase border-b-brand-gray-400 border-b-2 flex justify-between items-center">
      {children}
    </div>
  )
}
