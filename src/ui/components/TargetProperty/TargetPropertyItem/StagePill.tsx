import { useState } from 'react'

import cx from 'classnames'

import { useUIContext } from '@/providers/UIProvider'
import { editTargetProperty } from '@/requests/targetProperty/edit'
import type { PropertyHuntingStage, TargetPropertyInterface } from '@/types/targetProperty'
import ScheduledVisitForm from '@/ui/forms/TargetProperty/ScheduledVisit'

import SelectRaw from '../../base/_raw/Select'

interface StagePillProps {
  stage: PropertyHuntingStage
  targetId: string
}

type StageOption = {
  label: string
  value: PropertyHuntingStage
}

const huntingStageOptions: StageOption[] = [
  { label: 'Novo', value: 'new' },
  { label: 'Contato feito', value: 'iniciated' },
  { label: 'Retorno recebido', value: 'returned' },
  { label: 'Não tive mais notícias', value: 'disappeared' },
  { label: 'Visita agendada', value: 'scheduled' },
  { label: 'Indisponível', value: 'unavailable' },
  { label: 'Visitado', value: 'visited' },
  { label: 'Desisti', value: 'quit' },
  { label: 'Ficha enviada', value: 'submitted' },
  { label: 'Ficha aprovada', value: 'approved' },
  { label: 'Ficha negada', value: 'denied' }
]

export function StagePill({ stage, targetId }: StagePillProps) {
  const [selectedStage, setSelectedStage] = useState<PropertyHuntingStage>(stage)

  const { modal } = useUIContext()

  const stageStyle = cx(
    'rounded-full text-xs px-2.5 pb-1 pt-1.5 flex items-center tracking-wide w-full',
    {
      'bg-sky-700 text-white': selectedStage === 'new',
      'bg-sky-300 text-sky-950': selectedStage === 'iniciated',
      '': selectedStage === 'returned',
      'bg-slate-700 text-white': selectedStage === 'disappeared',
      'bg-amber-400 text-slate-950': selectedStage === 'scheduled',
      'bg-slate-600 text-white': selectedStage === 'unavailable',
      'bg-amber-500 text-slate-950': selectedStage === 'visited',
      'bg-red-800 text-white': selectedStage === 'quit',
      'bg-green-600 text-slate-950': selectedStage === 'submitted',
      'bg-green-200 text-green-800': selectedStage === 'approved',
      'bg-red-400 text-red-950': selectedStage === 'denied'
    }
  )

  function handleUpdateTargetStage(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStage = e.target.value as PropertyHuntingStage

    if (!newStage) return

    switch (newStage as PropertyHuntingStage) {
      case 'scheduled':
        handleSchedule(newStage)
        break
      case 'unavailable':
        updateStage(newStage, { isActive: false })
        break
      case 'visited':
        updateStage(newStage)
        // handleVisited(newStage)
        break
      case 'quit':
        updateStage(newStage, { isActive: false })
        break
      case 'denied':
        updateStage(newStage, { isActive: false })
        break
      default:
        updateStage(newStage)
        break
    }
  }

  function handleSchedule(newStage: PropertyHuntingStage) {
    modal.open(
      'small',
      <ScheduledVisitForm
        onSuccess={modal.close}
        onFail={modal.close}
        submit={async (data: Partial<TargetPropertyInterface>) => await updateStage(newStage, data)}
      />
    )
  }

  // TODO: feature comentários
  // function handleVisited(newStage: PropertyHuntingStage) {
  //   modal.open(
  //     'small',
  //     <ScheduledVisitForm
  //       onSuccess={modal.close}
  //       onFail={modal.close}
  //       submit={async (data: Partial<TargetPropertyInterface>) => await updateStage(newStage, data)}
  //     />
  //   )
  // }

  async function updateStage(
    newStage: PropertyHuntingStage,
    otherData?: Partial<TargetPropertyInterface>
  ) {
    try {
      console.log('targetId', targetId)
      console.log('submit', newStage, otherData)

      const res = await editTargetProperty(targetId, { huntingStage: newStage, ...otherData })

      if (!res) {
        throw new Error()
      }

      console.log('success EditTargetProperty', res)

      setSelectedStage(newStage as PropertyHuntingStage)
    } catch (err) {
      // TODO: handle fail
    }
  }

  return (
    <SelectRaw
      options={huntingStageOptions}
      value={selectedStage}
      className={stageStyle}
      themeSize="sm"
      theme="nude"
      onChange={handleUpdateTargetStage}
    />
  )
}
