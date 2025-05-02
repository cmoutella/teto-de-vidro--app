'use client'

import Button from '@/ui/components/base/Button'

interface ScheduledVisitFormProps {
  close: () => void
  onFail: () => void
  confirm: () => Promise<void>
}

const DeleteConfirmation = ({ close, onFail, confirm }: ScheduledVisitFormProps) => {
  const submit = async () => {
    try {
      await confirm()

      close()
    } catch (_err) {
      onFail()
    }
  }

  return (
    <div className="w-full flex justify-center flex-col items-start p-2 pb-4 gap-3">
      <p className="text-xl text-brand-primary-700 font-semibold mb-2">Quer mesmo apagar?</p>
      <p className="text-brand-primary-900 text-sm mb-6">
        Ao confirmar não será possível desfazer.
      </p>
      <div className="w-full flex justify-end items-center gap-3">
        <Button
          label="Não, cancelar"
          className="bg-brand-primary-300 hover:to-brand-primary-400 text-medium"
          size="large"
          onClick={close}
        />
        <Button
          label="Sim, apagar!"
          className="bg-red-500 text-white hover:bg-red-600 text-medium"
          size="large"
          onClick={submit}
        />
      </div>
    </div>
  )
}

export default DeleteConfirmation
