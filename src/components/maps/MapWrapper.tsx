'use client'

import dynamic from 'next/dynamic'
import { Trail } from '@/types'

// Dynamically import TrailMap with no SSR
const TrailMap = dynamic(() => import('./TrailMap').then((mod) => mod.TrailMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-lg">
      <span className="text-gray-500">Loading map...</span>
    </div>
  ),
})

interface MapWrapperProps {
  trail: Trail
  className?: string
}

export function MapWrapper({ trail, className }: MapWrapperProps) {
  return <TrailMap trail={trail} className={className} />
}
