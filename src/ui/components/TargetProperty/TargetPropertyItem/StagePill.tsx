import cx from 'classnames'

import type { PropertyHuntingStage } from '@/types/targetProperty'

interface StagePillProps {
  stage: PropertyHuntingStage
}

export function StagePill({ stage }: StagePillProps) {
  const huntingStageTranslation: {
    [_key in PropertyHuntingStage]: string
  } = {
    new: 'Novo',
    iniciated: 'Contato feito',
    returned: 'Retorno recebido',
    disappeared: 'Não tive mais notícias',
    scheduled: 'Visita agendada',
    unavailable: 'Indisponível',
    visited: 'Visitado',
    quit: 'Desisti',
    submitted: 'Ficha enviada',
    approved: 'Ficha aprovada',
    denied: 'Ficha negada'
  }

  return (
    <div
      className={cx(
        'rounded-full text-xs px-2.5 pb-1 pt-1.5 flex items-center w-min tracking-wide',
        {
          'bg-sky-700 text-white': stage === 'new',
          'bg-sky-300 text-sky-950': stage === 'iniciated',
          '': stage === 'returned',
          'bg-slate-700 text-white': stage === 'disappeared',
          'bg-amber-400 text-slate-950': stage === 'scheduled',
          'bg-slate-600 text-white': stage === 'unavailable',
          'bg-amber-500 text-slate-950': stage === 'visited',
          'bg-red-800 text-white': stage === 'quit',
          'bg-green-600 text-slate-950': stage === 'submitted',
          'bg-green-200 text-green-800': stage === 'approved',
          'bg-red-400 text-red-950': stage === 'denied'
        }
      )}
    >
      <span className="leading-none whitespace-nowrap">{huntingStageTranslation[stage]}</span>
    </div>
  )
}
