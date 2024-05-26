import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types"
import { useTaskDebounce } from "../hooks/useTaskDebounce"
import { Controller, useForm } from "react-hook-form"
import { GripVertical, Loader, Trash } from "lucide-react"
import styles from "./ListView.module.scss"
import Checkbox from "@/components/ui/checkbox/Checkbox"
import { TransparentField } from "@/components/ui/field/TransparentField"
import { DatePicker } from "@/components/ui/task-edit/date-picker/DatePicker"
import { SingleSelect } from "@/components/ui/task-edit/SingleSelect"
import { useDeleteTask } from "../hooks/useDeleteTask"
import { Dispatch, SetStateAction } from "react"
import cn from "clsx"

interface IListRowProps {
  item: ITaskResponse
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListRow = ({ item, setItems }: IListRowProps) => {

  const { register, control, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      priority: item.priority,
      isCompleted: item.isCompleted,
      createdAt: item.createdAt
    }
  })
  const { deleteTask, isDeletePending } = useDeleteTask()
  useTaskDebounce({ watch, itemId: item.id })
  return <div
    className={cn(
      styles.row,
      watch("isCompleted") ? styles.completed : "",
      "animation-opacity")}
  >

    <div>
      <span className="inline-flex items-center gap-2.5 w-full">

        <button aria-describedby="todo-item">

          <GripVertical className={styles.grip} />
        </button>

        <Controller
          control={control}
          name="isCompleted"
          render={({ field: { value, onChange } }) => {
            return <Checkbox checked={value} onChange={onChange} />
          }} />

        <TransparentField {...register("name")} />
      </span>
    </div>
    <div>
      <Controller control={control} name="createdAt" render={({ field: { value, onChange } }) => {
        return <DatePicker value={value || ""} onChange={onChange} />
      }} />
    </div>

    <div className="capitilize">
      <Controller control={control} name={"priority"} render={({ field: { value, onChange } }) => {
        return <SingleSelect data={["low", "medium", "high"].map(item => ({ label: item, value: item }))} value={value || ""} onChange={onChange} />
      }} />
    </div>

    <button className="flex justify-center items-center" onClick={() => {
      return item?.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
    }}>{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}</button>
  </div>
}
