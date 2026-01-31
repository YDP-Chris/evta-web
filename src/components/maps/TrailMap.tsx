'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Trail } from '@/types'

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
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

interface TrailMapProps {
  trail: Trail
  className?: string
}

const difficultyColors: Record<string, string> = {
  Easy: '#22c55e',
  Moderate: '#f59e0b',
  Difficult: '#ef4444',
}

export function TrailMap({ trail, className = '' }: TrailMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Loading map...</span>
      </div>
    )
  }

  // Default center on Elkin, NC if no coordinates
  const center: [number, number] = [
    trail.trailhead_lat || 36.244,
    trail.trailhead_lng || -80.849,
  ]

  const trailColor = trail.difficulty ? difficultyColors[trail.difficulty] : '#16a34a'

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={14}
        className="h-full w-full rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Trail GeoJSON */}
        {trail.geojson && (
          <GeoJSON
            data={trail.geojson}
            style={{
              color: trailColor,
              weight: 4,
              opacity: 0.8,
            }}
          />
        )}

        {/* Trailhead Marker */}
        {trail.trailhead_lat && trail.trailhead_lng && (
          <Marker position={[trail.trailhead_lat, trail.trailhead_lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{trail.name}</h3>
                <p className="text-sm text-gray-600">Trailhead</p>
                {trail.parking_info && (
                  <p className="text-sm mt-2">{trail.parking_info}</p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${trail.trailhead_lat},${trail.trailhead_lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-evta-green-600 hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
