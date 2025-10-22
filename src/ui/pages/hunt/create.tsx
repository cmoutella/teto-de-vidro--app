'use client'

import { useRouter } from 'next/navigation'

import type { InterfacePublicUser } from '@/types/user'
import CreateHuntForm from '@/ui/forms/Hunt/CreateHunt'

interface CreateHuntViewProps {
  user: InterfacePublicUser
}

const CreateHuntView = ({ user }: CreateHuntViewProps) => {
  const router = useRouter()

  const handleSuccess = async (id: string) => {
    router.push(`/hunt/${id}`)
  }

  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <div className="container px-20 mb-10">
        <h1 className="text-3xl text-brand-primary-800 font-semibold">Nova mudança</h1>
      </div>
      <div className="container px-20">
        <CreateHuntForm
          user={user}
          onSuccess={(createdId: string) => handleSuccess(createdId)}
          onFail={() => {}}
        />
      </div>
    </div>
  )
}

export default CreateHuntView
