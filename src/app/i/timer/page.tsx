import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading/Heading'
import { Pomodoro } from './Pomodoro'

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
  title: 'Timer'
}

export default function TimerPage() {
  return <div>
    <Heading title='Pomodoro timer' />
    <Pomodoro />
  </div>
}
