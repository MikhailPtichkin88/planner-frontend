import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading/Heading'
import { TimeBlocking } from './TimeBlocking'

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
  title: 'Time blocking'
}

export default function TimeBlockingPage() {
  return <div>
    <Heading title='Time blocking'></Heading>
    <TimeBlocking />
  </div>
}
