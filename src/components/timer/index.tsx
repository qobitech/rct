import { useEffect, useState } from 'react'

// Function to format seconds into hh:mm:ss
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hrs.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const useCountDown = (
  startTime?: number,
  startTimer?: boolean
): string => {
  const [timeLeft, setTimeLeft] = useState<number>(startTime || 10)

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (timeLeft > 0) {
        return timeLeft - 1
      }
      return timeLeft
    }
    if (typeof startTimer === 'boolean' && !startTimer) return
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, startTimer]) // Added timeLeft as dependency to re-run the effect

  return formatTime(timeLeft)
}
