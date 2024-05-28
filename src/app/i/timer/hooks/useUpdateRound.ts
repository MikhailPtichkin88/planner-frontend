import { pomodoroService } from "@/services/pomodoro.service";
import { TypePomodoroRoundState } from "@/types/pomodoro.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateRound() {
  const queryClient = useQueryClient()
  const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
    mutationKey: ["update round"],
    mutationFn: ({ id, data }: { id: string, data: TypePomodoroRoundState }) => {
      return pomodoroService.updateRound(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get today session"] })
    }
  })
  return { updateRound, isUpdateRoundPending }
}