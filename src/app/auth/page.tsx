import { Auth } from './Auth'
import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
	title: 'Auth'
}

export default function AuthPage() {
	return <Auth />
}
