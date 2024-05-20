import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading/Heading'
import { Statistics } from './Statistics'

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
  title: 'Dashboard'
}

export default function DashboardPage() {
  return <div>
    <Heading title='Statistics' />
    <Statistics />
  </div>
}
