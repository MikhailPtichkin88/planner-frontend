"use client"

import { DragDropContext } from "@hello-pangea/dnd"
import { useTaskDnd } from "../hooks/useTaskDnd"
import { useTasks } from "../hooks/useTasks"
import styles from "./ListView.module.scss"
import { COLUMNS } from "../columns.data"
import { ListRowParent } from "./ListRowParent"


export const ListView = () => {

  const { items, setItems } = useTasks()
  const { onDragEnd } = useTaskDnd()

  return <DragDropContext onDragEnd={onDragEnd}>

    <div className={styles.table}>

      <div className={styles.header}>
        <div>Task name</div>
        <div>Due date</div>
        <div>Priority</div>
        <div />
      </div>

      <div className={styles.parentsWrapper}>
        {COLUMNS?.map((column) => (
          <ListRowParent
            key={column.value}
            value={column.value}
            label={column.label}
            items={items}
            setItems={setItems}
          />
        ))}
      </div>
    </div>
  </DragDropContext>
}

