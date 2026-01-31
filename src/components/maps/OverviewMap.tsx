'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Trail } from '@/types'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface OverviewMapProps {
  trails: Trail[]
}

const statusStyles = {
  Open: 'text-evta-green-600',
  Caution: 'text-amber-600',
  Closed: 'text-gray-500',
}

const difficultyStyles = {
  Easy: 'bg-evta-green-100 text-evta-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Difficult: 'bg-red-100 text-red-700',
}

export function OverviewMap({ trails }: OverviewMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    )
  }

  // Calculate center point from all trailheads
  const trailsWithCoords = trails.filter((t) => t.trailhead_lat && t.trailhead_lng)
  const centerLat = trailsWithCoords.reduce((sum, t) => sum + (t.trailhead_lat || 0), 0) / trailsWithCoords.length || 36.244
  const centerLng = trailsWithCoords.reduce((sum, t) => sum + (t.trailhead_lng || 0), 0) / trailsWithCoords.length || -80.849

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={12}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {trailsWithCoords.map((trail) => (
        <Marker
          key={trail.id}
          position={[trail.trailhead_lat!, trail.trailhead_lng!]}
        >
          <Popup>
            <div className="p-1 min-w-[200px]">
              <h3 className="font-semibold text-gray-900">{trail.name}</h3>
              <p className={`text-sm font-medium ${statusStyles[trail.status]}`}>
                {trail.status}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                {trail.distance_miles && <span>{trail.distance_miles} mi</span>}
                {trail.difficulty && (
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${difficultyStyles[trail.difficulty]}`}>
                    {trail.difficulty}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                {trail.activity_types.slice(0, 3).map((activity) => (
                  <span
                    key={activity}
                    className="text-xs bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-600"
                  >
                    {activity}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <Link
                  href={`/trails/${trail.slug}`}
                  className="text-sm text-evta-green-600 hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
