'use client'

import PrivateBasePage from '@template/PrivateBasePage'

import type { InterfaceHunt } from '@/types/hunt'
import type { InterfaceUser } from '@/types/user'
import { genderVowel } from '@/utils/lang'

import NextMoveDashboard from '../components/NextMove'

interface PrivateHomeViewProps {
  hunts: InterfaceHunt[]
  user: Omit<InterfaceUser, 'password'>
}

const PrivateHomeView = ({ hunts, user }: PrivateHomeViewProps) => {
  const firstName = user?.name.split(' ')[0]

  return (
    <PrivateBasePage user={user}>
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        {user && (
          <div className="container py-2">
            <h2 className="text-2xl text-brand-primary-900">
              Bem vind{genderVowel[user.gender]} <span className="capitalize">{firstName},</span>
            </h2>
          </div>
        )}
        <div className="container">
          <NextMoveDashboard hunts={hunts} />
        </div>
      </div>
    </PrivateBasePage>
  )
}

export default PrivateHomeView
