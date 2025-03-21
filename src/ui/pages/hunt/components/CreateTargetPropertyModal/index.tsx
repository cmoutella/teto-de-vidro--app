import Modal from '@ui/base/Modal'

import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

export interface CreateTargetPropertyModalProps {
  isOpen: boolean
  setClose: () => void
}

export default function CreateTargetPropertyModal({
  isOpen,
  setClose
}: CreateTargetPropertyModalProps) {
  function handleSuccess() {
    console.log('success')
  }
  function handleFail() {
    console.log('fail')
  }

  return (
    <Modal isOpen={isOpen} setClose={setClose} size="large">
      <CreateTargetPropertyForm onSuccess={handleSuccess} onFail={handleFail} />
    </Modal>
  )
}
