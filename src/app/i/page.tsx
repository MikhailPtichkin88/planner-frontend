import { Statistics } from './Statistics'
import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
	title: 'Dashboard'
}

export default function DashboardPage() {
	return (
		<div>
			<Heading title='Statistics' />
			<Statistics />
		</div>
	)
}
