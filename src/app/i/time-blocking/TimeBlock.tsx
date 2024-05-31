import type { ITimeBlockResponse, TypeTimeBlockFormState } from "@/types/time-block.types"
import { useFormContext } from "react-hook-form"
import { useDeleteTimeBlock } from "./hooks/useDeleteTimeBloc"
import { useTimeBlockSortable } from "./hooks/useTimeBlockSortable"
import cls from "./TimeBlocking.module.scss"
import { Edit, GripVertical, Trash } from "lucide-react"
import Loader from "@/components/ui/Loader"
interface ITimeBlockProps {
  item: ITimeBlockResponse
}

export const TimeBlock = ({ item }: ITimeBlockProps) => {
  const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(item.id)
  const { reset } = useFormContext<TypeTimeBlockFormState>()
  const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock()

  return <div ref={setNodeRef} style={style}>

    <div className={cls.block} style={{ backgroundColor: item.color || "lightgrey", height: `${item.duration}px` }}>

      <div className="flex items-center">
        <button {...attributes} {...listeners} aria-describedby="time-block">
          <GripVertical className={cls.grip} />
        </button>
        <div>{item.name}{' '}
          <i className="text-xs opacity-50">({item.duration} min.)</i></div>
      </div>

      <div className={cls.actions}>
        <button onClick={() => {
          reset({
            id: item.id,
            color: item.color,
            duration: item.duration,
            name: item.name,
            order: item.order
          })
        }} className="opacity-50 transition-opacity hover:opacity-100 mr-2">

          <Edit size={16} />
        </button>
        <button onClick={() => deleteTimeBlock(item.id)} className="opacity-50 transition-opacity hover:opacity-100">
          {isDeletePending ? <Loader /> : <Trash size={16} />}
        </button>
      </div>
    </div>
  </div>
}
