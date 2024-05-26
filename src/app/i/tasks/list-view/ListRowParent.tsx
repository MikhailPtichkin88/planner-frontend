import type { ITaskResponse } from "@/types/task.types"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Dispatch, SetStateAction } from "react"
import styles from "./ListView.module.scss"
import { ListRow } from "./ListRow"
import { ListAddRowInput } from "./ListAddRowInput"
import { FILTERS } from "../columns.data"
import { filterTasks } from "../filterTasks"
interface IListRowParentProps {
  value: string
  label: string
  items: ITaskResponse[] | undefined
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListRowParent = ({
  value, label, items, setItems
}: IListRowParentProps) => {

  return <Droppable droppableId={value}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>

        <div className={styles.colHeading}>
          <div className='w-full'>{label}</div>
        </div>

        {filterTasks(items, value)?.map((item, index) => (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
          >
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <ListRow
                  key={item.id}
                  item={item}
                  setItems={setItems}
                />
              </div>
            )}
          </Draggable>
        ))}

        {provided.placeholder}

        {value !== 'completed' && !items?.some(item => !item.id) && (
          <ListAddRowInput
            setItems={setItems}
            filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
          />
        )}
      </div>
    )}
  </Droppable>

}
