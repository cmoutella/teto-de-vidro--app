'use client'

import { useEffect, useState } from 'react'

import { getAllHuntsByUser } from '@api/hunt/getAllHuntsByUser'
import { useSessionContext } from '@providers/AuthProvider'
import PrivateBasePage from '@template/PrivateBasePage'
import { useRouter } from 'next/navigation'

import type { InterfaceHunt } from '@/types/app'
import { genderVowel } from '@/utils/lang'

import NextMoveDashboard from '../components/NextMove'

const PrivateHomeView = () => {
  const { user } = useSessionContext()

  const [hunts, setHunts] = useState<InterfaceHunt[]>([])
  const firstName = user?.name.split(' ')[0]

  const router = useRouter()

  async function getUserHunts() {
    if (!user) return
    const data = await getAllHuntsByUser(user.id, 1, 1)

    console.log('my hunts', data)

    if (!data) {
      router.push('')
      return
    }

    setHunts(data)
  }

  useEffect(() => {
    getUserHunts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PrivateBasePage>
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
