"use client"

import { useState } from "react"
import { ListView } from "./list-view/ListView"

export type TypeView = "list" | "kanban"

export const TasksView = () => {
  const [view, setView] = useState<TypeView>("list")
  return <ListView />
}
