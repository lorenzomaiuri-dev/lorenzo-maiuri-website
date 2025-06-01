'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Lazy load
const LazyCustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false })

export default function CustomCursorWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const handleMouseMove = () => {
      setShouldLoad(true)
      window.removeEventListener('mousemove', handleMouseMove)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return shouldLoad ? <LazyCustomCursor /> : null
}
