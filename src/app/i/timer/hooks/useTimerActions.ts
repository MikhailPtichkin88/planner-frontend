import { useUpdateRound } from "./useUpdateRound"
import { useLoadSettings } from "./useLoadSettings"
import type { ITimerState } from "../types"
import { IPomodoroRoundResponse } from "@/types/pomodoro.types"

type TAction = ITimerState & { rounds: IPomodoroRoundResponse[] | undefined }

export function useTimerActions({ secondsLeft, activeRound, rounds, setIsRunning, setActiveRound }: TAction) {
  const { workInterval } = useLoadSettings()
  const { isUpdateRoundPending, updateRound } = useUpdateRound()

  const pauseHandler = () => {

    setIsRunning(false)

    if (activeRound?.id) {
      updateRound({
        id: activeRound?.id,
        data: {
          totalSeconds: secondsLeft,
          isCompleted: secondsLeft === 0
        }
      })
    }
  }

  const playHandler = () => {
    setIsRunning(true)
  }

  const nextRoundHandler = () => {
    if (!activeRound?.id) return
    updateRound({
      id: activeRound?.id,
      data: {
        isCompleted: true,
        totalSeconds: workInterval * 60
      }
    })
  }

  const prevRoundHandler = () => {
    const lastCompletedRound = rounds?.findLast(round => round.isCompleted)
    if (!lastCompletedRound) return
    updateRound({
      id: lastCompletedRound.id,
      data: {
        isCompleted: false,
        totalSeconds: 0
      }
    })
    setActiveRound(lastCompletedRound)
  }
  return { isUpdateRoundPending, pauseHandler, playHandler, nextRoundHandler, prevRoundHandler }
}