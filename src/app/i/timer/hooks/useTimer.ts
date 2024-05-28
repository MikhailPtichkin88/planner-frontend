import { useEffect, useState } from "react"
import { useLoadSettings } from "./useLoadSettings"
import type { IPomodoroRoundResponse } from "@/types/pomodoro.types"
import type { ITimerState } from "../types"

type TUseTimerResponse = ITimerState & { isRunning: boolean }

export function useTimer(): TUseTimerResponse {

  const { breakInterval, workInterval } = useLoadSettings()

  const [isRunning, setIsRunning] = useState(false)
  const [isBreakTime, setIsBreakTime] = useState(false)

  const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
  const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1)
      }, 1000)
    } else if (!isRunning && secondsLeft !== 0 && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, secondsLeft, workInterval, activeRound])


  useEffect(() => {

    if (secondsLeft === 0) {

      setIsBreakTime(!isBreakTime)
      setSecondsLeft((isBreakTime ? breakInterval : workInterval) * 60)
    }


  }, [secondsLeft, breakInterval, workInterval, isBreakTime])
  return { secondsLeft, activeRound, isRunning, setIsRunning, setSecondsLeft, setActiveRound }
}