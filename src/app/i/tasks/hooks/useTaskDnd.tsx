import type { DropResult } from '@hello-pangea/dnd'
import { useUpdateTask } from './useUpdateTask'
import { FILTERS } from '../columns.data'
export function useTaskDnd() {
  const { updateTask } = useUpdateTask()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const destinationColumnId = result.destination.droppableId
    if (destinationColumnId === result.source.droppableId) return

    if (destinationColumnId === "completed") {
      updateTask({
        id: result.draggableId,
        data: {
          isCompleted: true
        }
      })
      return
    }
    const newCreatedAt = FILTERS[destinationColumnId].format()
    updateTask({
      id: result.draggableId,
      data: {
        isCompleted: false,
        createdAt: newCreatedAt
      }
    })
  }
  return { onDragEnd }
}