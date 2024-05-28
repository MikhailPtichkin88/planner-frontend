"use client"

import { useState } from "react"
import { ListView } from "./list-view/ListView"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Loader from "@/components/ui/Loader"
import { SwitcherView } from "./SwitcherView"
import { KanbanView } from "./kanban-view/KanbanView"

export type TypeView = "list" | "kanban"

export const TasksView = () => {
  const [type, setType, isLoading] = useLocalStorage<TypeView>({ key: 'view-type', defaultValue: "list" })

  if (isLoading) return <Loader />


  return <div>

    <SwitcherView
      setType={setType}
      type={type}
    />
    {type === "list" ? <ListView /> : <KanbanView />}
  </div>
}
