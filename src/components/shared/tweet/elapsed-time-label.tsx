'use client'

import { useEffect, useState } from 'react'

type Props = {
  startTime: Date
}

const ElapsedTimeLabel = ({ startTime }: Props) => {
  const [elapsedTime, setElapsedTime] = useState(getTimeAgo(startTime.toISOString()))

  useEffect(() => {
    function getInterval() {
      const now = new Date()
      const diff = (now.getTime() - startTime.getTime()) / 1000 // seconds
      if (diff < 60) return 1000 // every second
      if (diff < 3600) return 60 * 1000 // every minute
      if (diff < 86400) return 60 * 60 * 1000 // every hour
      return null // don't update
    }

    let intervalId: NodeJS.Timeout | null = null
    let stopped = false

    function update() {
      setElapsedTime(getTimeAgo(startTime.toISOString()))
      const interval = getInterval()
      if (interval === null) {
        stopped = true
        if (intervalId) clearTimeout(intervalId)
        return
      }
      intervalId = setTimeout(update, interval)
    }

    update()

    return () => {
      stopped = true
      if (intervalId) clearTimeout(intervalId)
    }
  }, [startTime])

  return <span>{elapsedTime}</span>
}

export default ElapsedTimeLabel

function getTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000 // seconds
  if (diff < 60) return `${Math.floor(diff)}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d`
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  if (now.getFullYear() !== date.getFullYear()) {
    options.year = 'numeric'
  }
  return date.toLocaleDateString(undefined, options)
}
