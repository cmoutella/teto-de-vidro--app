import Modal from '@ui/base/Modal'

import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

export interface CreateTargetPropertyModalProps {
  huntId: string
  isOpen: boolean
  setClose: () => void
  onSuccess?: () => void
}

export default function CreateTargetPropertyModal({
  huntId,
  isOpen,
  setClose,
  onSuccess
}: CreateTargetPropertyModalProps) {
  function handleSuccess() {
    onSuccess && onSuccess()
    setClose()
  }

  function handleFail() {
    // TODO: CreateTargetProperty handle fail
    console.log('fail')
  }

  return (
    <Modal isOpen={isOpen} setClose={setClose} size="large">
      <CreateTargetPropertyForm onSuccess={handleSuccess} onFail={handleFail} huntId={huntId} />
    </Modal>
  )
}
