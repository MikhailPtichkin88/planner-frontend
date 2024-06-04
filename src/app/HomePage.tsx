"use client"
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
  title: 'Home'
}

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/i")
  }, [])
  return <div>Home</div>
}
