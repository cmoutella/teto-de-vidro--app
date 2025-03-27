import { useHuntContext } from '@/providers/HuntProvider'
import type { InterfaceHunt } from '@/types/app'
import Modal from '@/ui/components/base/Modal'
import EditHuntForm from '@/ui/forms/Hunt/EditHunt'

export interface EditHuntModalProps {
  isOpen: boolean
  setClose: () => void
}

export function EditHuntModal({ isOpen, setClose }: EditHuntModalProps) {
  function handleFail() {
    // TODO: EditHunt handle fail
    console.log('fail EditHunt')
  }

  const { hunt, update } = useHuntContext()

  function onSuccess(updatedHunt: InterfaceHunt) {
    update(updatedHunt)
  }

  function handleSuccess(updatedHunt: InterfaceHunt) {
    onSuccess(updatedHunt)
    setClose()
  }

  return (
    <Modal isOpen={isOpen} setClose={setClose} size="large">
      <EditHuntForm
        currentData={hunt as InterfaceHunt}
        onSuccess={handleSuccess}
        onFail={handleFail}
      />
    </Modal>
  )
}
