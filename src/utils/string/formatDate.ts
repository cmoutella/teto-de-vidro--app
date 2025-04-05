export function formatStringDate(value: string): string {
  // Remove tudo que não for número
  const dateString = value.replace(/\D/g, '').slice(0, 8)

  const dateParts = []

  if (dateString.length >= 2) {
    dateParts.push(dateString.slice(0, 2))
  } else if (dateString.length > 0) {
    dateParts.push(dateString)
  }

  if (dateString.length >= 4) {
    dateParts.push(dateString.slice(2, 4))
  } else if (dateString.length > 2) {
    dateParts.push(dateString.slice(2))
  }

  if (dateString.length > 4) {
    dateParts.push(dateString.slice(4))
  }

  return dateParts.join('/')
}

export function formatTime(value: string): string {
  // Remove tudo que não for número
  const timeString = value.replace(/\D/g, '').slice(0, 4)

  const timeParts = []

  if (timeString.length >= 2) {
    timeParts.push(timeString.slice(0, 2))
  } else if (timeString.length > 0) {
    timeParts.push(timeString)
  }

  if (timeString.length > 2) {
    timeParts.push(timeString.slice(2))
  }

  return timeParts.join(':')
}
