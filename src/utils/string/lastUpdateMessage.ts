import { differenceInWeeks, format } from 'date-fns'
import { differenceInDays } from 'date-fns/differenceInDays'
import { differenceInHours } from 'date-fns/differenceInHours'
import { differenceInMinutes } from 'date-fns/differenceInMinutes'
import { isSameDay } from 'date-fns/isSameDay'

export function lastUpdateMessage(updateDate: string) {
  const updatedAt = new Date(updateDate)

  if (isSameDay(new Date(), updatedAt)) {
    const diffInMinutes = differenceInMinutes(new Date(), updatedAt)

    if (diffInMinutes <= 59) {
      return `há ${diffInMinutes.toString()} minutos`
    }

    const diffInHours = differenceInHours(new Date(), updatedAt)

    return `há ${diffInHours.toString()} horas`
  }

  const diffInDays = differenceInDays(new Date(), updatedAt)

  if (diffInDays <= 5) {
    return `há ${diffInDays.toString()} semanas`
  }

  const diffInWeeks = differenceInWeeks(new Date(), updatedAt)

  if (diffInWeeks <= 4) {
    return `há ${diffInWeeks.toString()} semanas`
  }

  return `em ${format(updatedAt, 'dd/MM/yyyy')}`
}
