import Modal from '@ui/base/Modal'

import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

export interface CreateTargetPropertyModalProps {
  isOpen: boolean
  setClose: () => void
  huntId: string
}

export default function CreateTargetPropertyModal({
  isOpen,
  setClose,
  huntId
}: CreateTargetPropertyModalProps) {
  function handleSuccess() {
    console.log('success')
  }
  function handleFail() {
    console.log('fail')
  }

  return (
    <Modal isOpen={isOpen} setClose={setClose} size="large">
      <CreateTargetPropertyForm onSuccess={handleSuccess} onFail={handleFail} huntId={huntId} />
    </Modal>
  )
}
