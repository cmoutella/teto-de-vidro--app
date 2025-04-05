'use client'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import { Loading } from '@/ui/components/base/Loading'
import type { ModalProps, ModalSize } from '@/ui/components/base/Modal'
import Modal from '@/ui/components/base/Modal'

type InterfaceAction = () => void

interface UIContext {
  loading: {
    on: InterfaceAction
    off: InterfaceAction
    state: boolean
  }
  modal: {
    open: (_s: ModalSize, _c: ReactNode) => void
    close: () => void
  }
}

interface UIModal extends Pick<ModalProps, 'isOpen' | 'size'> {
  content: ReactNode
}

const DEFAULT_VALUES = {
  loading: {
    on: () => {},
    off: () => {},
    state: false
  },
  modal: { open: () => {}, close: () => {} }
}

const UIContext = createContext<UIContext>(DEFAULT_VALUES)

export const useUIContext = () => {
  const context = useContext(UIContext)

  if (context === undefined) {
    throw new Error('Missing UIContext on React three')
  }

  return context
}

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(DEFAULT_VALUES.loading.state)
  const [modal, setModal] = useState<UIModal | null>(null)

  const showLoadingScreen = () => {
    setLoadingScreen(true)
  }
  const hideLoadingScreen = () => {
    setLoadingScreen(false)
  }

  const initModal = (size: ModalSize, content: ReactNode) => {
    setModal({ content, isOpen: true, size })
  }

  const endModal = () => {
    setModal(null)
  }

  const value = {
    loading: {
      on: showLoadingScreen,
      off: hideLoadingScreen,
      state: loadingScreen
    },
    modal: {
      open: initModal,
      close: endModal
    }
  }

  return (
    <UIContext.Provider value={value}>
      <Toaster position="top-right" toastOptions={{ duration: 5000, removeDelay: 500 }} />
      <Loading />
      {children}
      <Modal isOpen={!!modal?.isOpen} setClose={endModal} size={modal?.size}>
        {modal?.content}
      </Modal>
    </UIContext.Provider>
  )
}
