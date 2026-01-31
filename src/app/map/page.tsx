import { Metadata } from 'next'
import { OverviewMap } from '@/components/maps/OverviewMap'
import { mockTrails } from '@/lib/data/mock-trails'

export const metadata: Metadata = {
  title: 'Trail Map',
  description: 'View all Elkin Valley trails on an interactive map. Find trailheads, parking, and plan your adventure.',
}

export default async function MapPage() {
  // TODO: Replace with Supabase query
  const trails = mockTrails

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-evta-green-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Trail Map</h1>
          <p className="text-evta-green-100">
            Explore all {trails.length} trails in the Elkin Valley
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="h-[calc(100vh-200px)] min-h-[500px]">
        <OverviewMap trails={trails} />
      </div>

      {/* Legend */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Difficulty Levels</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-evta-green-100 text-evta-green-700 border border-evta-green-200">Easy</span>
              <span className="text-sm text-gray-600">Gentle terrain, suitable for beginners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">Moderate</span>
              <span className="text-sm text-gray-600">Some elevation, intermediate skill</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Difficult</span>
              <span className="text-sm text-gray-600">Challenging terrain, experienced hikers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
