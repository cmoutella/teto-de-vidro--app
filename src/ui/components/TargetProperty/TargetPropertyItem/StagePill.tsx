import { useState } from 'react'

import cx from 'classnames'

import type { PropertyHuntingStage } from '@/types/targetProperty'

import SelectRaw from '../../base/_raw/Select'

interface StagePillProps {
  stage: PropertyHuntingStage
}

type StageOption = {
  label: string
  value: PropertyHuntingStage
}

export function StagePill({ stage }: StagePillProps) {
  const [selectedStage, setSelectedStage] = useState<PropertyHuntingStage>(stage)

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

  function updateTargetStage(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStage = e.target.value

    if (!newStage) return

    // TODO: comportamentos personalisados
    // 1. se for "scheduled" abrir um modal pra definir a data e hora, se a request for sucesso fazer o setSelectedStage
    try {
      console.log(newStage)

      // se sucesso
      setSelectedStage(newStage as PropertyHuntingStage)

      // ao alterar para visita agendada abrir modal para definir dada da visita
    } catch (err) {
      // se falha
    }
  }

  return (
    <SelectRaw
      options={huntingStageOptions}
      value={selectedStage}
      className={stageStyle}
      themeSize="sm"
      theme="nude"
      onChange={updateTargetStage}
    />
  )
}
