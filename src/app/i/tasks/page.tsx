import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading/Heading'
import { TasksView } from './TasksView'

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
  title: 'Tasks'
}

export default function TasksPage() {
  return <div>
    <Heading title='Tasks' />
    <TasksView />
  </div>
}
