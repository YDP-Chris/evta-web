import Link from 'next/link'
import { Trail } from '@/types'
import { cn } from '@/lib/utils/cn'

interface TrailCardProps {
  trail: Trail
}

// Status uses text + subtle shape variation for accessibility
const statusStyles = {
  Open: 'bg-evta-green-600 text-white',
  Caution: 'bg-amber-500 text-white border border-amber-600',
  Closed: 'bg-gray-500 text-white',
}

// Difficulty badge styles with shape variation
const difficultyStyles = {
  Easy: 'bg-evta-green-100 text-evta-green-700 border-evta-green-200',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  Difficult: 'bg-red-50 text-red-700 border-red-200',
}

export function TrailCard({ trail }: TrailCardProps) {
  return (
    <Link
      href={`/trails/${trail.slug}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group"
    >
      {/* Image placeholder or actual image */}
      <div className="aspect-video bg-gradient-to-br from-evta-green-100 to-evta-green-50 relative overflow-hidden">
        {trail.images && trail.images.length > 0 ? (
          <img
            src={trail.images[0]}
            alt={trail.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Subtle tree silhouette as placeholder */}
            <svg className="w-16 h-16 text-evta-green-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L7 9h2l-3 5h2l-4 6h16l-4-6h2l-3-5h2L12 2zm0 18v2h-1v-2h1z"/>
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm',
              statusStyles[trail.status]
            )}
          >
            {trail.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Trail Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-evta-green-700 transition-colors">
          {trail.name}
        </h3>

        {/* Short Description */}
        {trail.short_description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {trail.short_description}
          </p>
        )}

        {/* Trail Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm text-gray-600">
          {trail.distance_miles && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <span>{trail.distance_miles} mi</span>
            </span>
          )}
          {trail.elevation_gain_ft && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <span>{trail.elevation_gain_ft} ft</span>
            </span>
          )}
          {trail.difficulty && (
            <span
              className={cn(
                'px-2 py-0.5 rounded border text-xs font-medium',
                difficultyStyles[trail.difficulty as keyof typeof difficultyStyles]
              )}
            >
              {trail.difficulty}
            </span>
          )}
        </div>

        {/* Activity Types */}
        <div className="flex flex-wrap gap-2">
          {trail.activity_types.map((activity) => (
            <span
              key={activity}
              className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs text-gray-600 font-medium"
            >
              {activity}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
