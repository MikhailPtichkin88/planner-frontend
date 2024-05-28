import { pomodoroService } from "@/services/pomodoro.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ITimerState } from "../types";
import { useLoadSettings } from "./useLoadSettings";


export function useTodaySession({ setActiveRound, setSecondsLeft }: ITimerState) {

  const { workInterval } = useLoadSettings()
  const { data: sessionResponse, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ['get today session'],
    queryFn: () => pomodoroService.getTodaySession()
  })

  const rounds = sessionResponse?.data?.rounds

  useEffect(() => {
    if (isSuccess && rounds) {
      const activeRound = rounds.find(round => !round.isCompleted)
      setActiveRound(activeRound)
      if (activeRound && activeRound.totalSeconds !== 0) {
        setSecondsLeft(activeRound.totalSeconds)
      }
    }
  }, [isSuccess, rounds])

  return { sessionResponse, isLoading, refetch, isSuccess, workInterval }
}