'use client'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import { Loading } from '@/ui/components/base/Loading'
import type { ModalProps, ModalSize } from '@/ui/components/base/Modal'
import Modal from '@/ui/components/base/Modal'

type InterfaceAction = () => void

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large'

interface UIContext {
  mounted: boolean
  device: DeviceType
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
  mounted: false,
  device: 'desktop' as DeviceType,
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
  const [mounted, setMounted] = useState<boolean>(DEFAULT_VALUES.mounted)
  const [deviceType, setDeviceType] = useState<DeviceType>(DEFAULT_VALUES.device)

  const [loadingScreen, setLoadingScreen] = useState<boolean>(DEFAULT_VALUES.loading.state)
  const [modal, setModal] = useState<UIModal | null>(null)

  useEffect(() => {
    setMounted(true)

    const updateDevice = (): void => {
      const width = window.innerWidth
      if (width <= 768) {
        setDeviceType('mobile')
      } else if (width <= 1024) {
        setDeviceType('tablet')
      } else if (width <= 1240) {
        setDeviceType('desktop')
      } else {
        setDeviceType('large')
      }
    }

    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

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
    mounted: mounted,
    device: deviceType,
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
