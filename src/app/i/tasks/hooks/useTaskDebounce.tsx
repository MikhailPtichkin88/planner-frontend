import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";
import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";
import { UseFormWatch } from "react-hook-form";
import { TypeTaskFormState } from "@/types/task.types";


interface IUseTaskDebounce {
  watch: UseFormWatch<TypeTaskFormState>
  itemId?: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
  const { createTask } = useCreateTask()
  const { updateTask } = useUpdateTask()
  const debounceCreateTask = useDebounce(createTask)
  const debounceUpdateTask = useDebounce(updateTask)

  useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      if (itemId) {
        debounceUpdateTask({
          id: itemId, data: formData
        })
      } else {
        debounceCreateTask(formData)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [watch(), debounceUpdateTask])
}