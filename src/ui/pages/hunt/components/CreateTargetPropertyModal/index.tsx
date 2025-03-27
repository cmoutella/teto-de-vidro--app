import Modal from '@ui/base/Modal'

import { useHuntContext } from '@/providers/HuntProvider'
import CreateTargetPropertyForm from '@/ui/forms/TargetProperty/CreateTargetProperty'

export interface CreateTargetPropertyModalProps {
  huntId: string
  isOpen: boolean
  setClose: () => void
}

export default function CreateTargetPropertyModal({
  huntId,
  isOpen,
  setClose
}: CreateTargetPropertyModalProps) {
  const { update } = useHuntContext()

  function onSuccess() {
    update()
  }

  function handleSuccess() {
    onSuccess()
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
