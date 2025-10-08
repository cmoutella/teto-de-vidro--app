import c from 'classnames'

interface TrackingBulletsProps {
  current: number
  max: number
  bulletColor: string
}

export function TrackingBullets({ max, current, bulletColor }: TrackingBulletsProps) {
  function generateItems() {
    const items = []

    for (let index = 0; index <= max - 1; index++) {
      items.push(index)
    }

    return items
  }

  return (
    <div className="flex items-center justify-center gap-2 md:gap-2.5">
      {generateItems().map((bullet) => {
        return (
          <div
            className={c('h-1 md:h-1.5 w-6 md:w-10 rounded-md', bulletColor, {
              'opacity-60': bullet > current
            })}
            key={bullet}
          ></div>
        )
      })}
    </div>
  )
}
