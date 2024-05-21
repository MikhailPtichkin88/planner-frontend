import { Settings } from './Settings'
import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
	title: 'Settings'
}

export default function SettingsPage() {
	return (
		<div>
			<Heading title='Settings' />
			<Settings />
		</div>
	)
}
