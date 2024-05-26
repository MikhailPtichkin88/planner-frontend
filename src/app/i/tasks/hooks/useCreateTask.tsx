import { taskService } from "@/services/task.service";
import { TypeTaskFormState } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useCreateTask() {

  const queryClient = useQueryClient()
  const { mutate: createTask } = useMutation({
    mutationKey: ["create task"],
    mutationFn: (data: TypeTaskFormState) => {
      return taskService.createTask(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    }
  })
  return { createTask }
}