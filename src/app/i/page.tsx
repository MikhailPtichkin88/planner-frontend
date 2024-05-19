import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
  title: 'Dashboard'
}

export default function DashboardPage() {
  return <div>Dashboard</div>
}
