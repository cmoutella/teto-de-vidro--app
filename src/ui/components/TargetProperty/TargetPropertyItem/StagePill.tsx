'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import cx from 'classnames'

import { useUIContext } from '@/providers/UIProvider'
import { updateTargetProperty } from '@/requests/client/targetProperty/update'
import type { TargetComment } from '@/types/comment'
import type { PropertyHuntingStage, TargetPropertyInterface } from '@/types/targetProperty'
import ScheduledVisitForm from '@/ui/forms/TargetProperty/ScheduledVisit'
import TargetCommentForm from '@/ui/forms/TargetProperty/TargetCommentForm'

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
      case 'disappeared':
        handleUpdateWithComment(
          newStage,
          { isActive: false },
          { title: 'O negociante sumiu?', commentLabel: 'Conte sobre a sua experiência' }
        )

        break
      case 'visited':
        handleUpdateWithComment(
          newStage,
          { isActive: false },
          { title: 'Como foi a visita?', commentLabel: 'O que você achou do que viu?' }
        )
        break
      case 'quit':
        handleUpdateWithComment(
          newStage,
          { isActive: false },
          { title: 'Desistiu do imóvel?', commentLabel: 'Alguma coisa desagradou? O que?' }
        )
        break
      case 'denied':
        updateStage(newStage, { isActive: false })
        break
      default:
        updateStage(newStage, { isActive: true })
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

  function handleUpdateWithComment(
    newStage: PropertyHuntingStage,
    otherData: Partial<TargetPropertyInterface>,
    uiOptions: {
      title: string
      commentLabel?: string
    }
  ) {
    modal.open(
      'small',
      <TargetCommentForm
        formTitle={uiOptions.title}
        commentLabel={uiOptions.commentLabel ?? undefined}
        onSuccess={modal.close}
        onFail={modal.close}
        enableEmptyComment={true}
        submit={async (data: TargetComment) =>
          (await updateStage(newStage, otherData, data)) as never
        }
      />
    )
  }

  async function updateStage(
    newStage: PropertyHuntingStage,
    otherData?: Partial<TargetPropertyInterface>,
    comment?: TargetComment
  ) {
    try {
      const res = await updateTargetProperty(
        targetId,
        { huntingStage: newStage, ...otherData },
        comment
      )

      if (!res) {
        throw new Error()
      }

      toast.success('Etapa atualizada com sucesso!')
      setSelectedStage(newStage as PropertyHuntingStage)
    } catch (err) {
      toast.error('Erro ao atualizar etapa!')
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
