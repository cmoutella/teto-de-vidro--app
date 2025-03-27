import { useHuntContext } from '@/providers/HuntProvider'
import type { TargetPropertyInterface } from '@/types/targetProperty'
import Modal from '@/ui/components/base/Modal'
import EditTargetPropertyForm from '@/ui/forms/TargetProperty/EditTargetProperty'

export interface EditHuntModalProps {
  isOpen: boolean
  setClose: () => void
  target: TargetPropertyInterface | undefined
}

export function EditTargetPropertyModal({ isOpen, setClose, target }: EditHuntModalProps) {
  function handleFail() {
    // TODO: EditHunt handle fail
    console.log('fail EditHunt')
  }

  const { fetchProperties } = useHuntContext()

  function handleSuccess() {
    setClose()
    fetchProperties()
  }

  return (
    <Modal isOpen={isOpen} setClose={setClose} size="large">
      <EditTargetPropertyForm
        currentData={target as TargetPropertyInterface}
        onSuccess={handleSuccess}
        onFail={handleFail}
      />
    </Modal>
  )
}
