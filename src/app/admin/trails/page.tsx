import Link from 'next/link'
import { mockTrails } from '@/lib/data/mock-trails'
import { cn } from '@/lib/utils/cn'

const statusStyles = {
  Open: 'bg-evta-green-100 text-evta-green-700',
  Caution: 'bg-amber-100 text-amber-700',
  Closed: 'bg-gray-100 text-gray-600',
}

const difficultyStyles = {
  Easy: 'bg-evta-green-50 text-evta-green-700',
  Moderate: 'bg-amber-50 text-amber-700',
  Difficult: 'bg-red-50 text-red-700',
}

export default async function AdminTrailsPage() {
  // TODO: Replace with Supabase query
  const trails = mockTrails

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trails</h1>
        <button className="px-4 py-2 bg-evta-green-600 text-white font-medium rounded-lg hover:bg-evta-green-700 transition-colors">
          + Add Trail
        </button>
      </div>

      {/* Trails Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Trail</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Activities</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Difficulty</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trails.map((trail) => (
              <tr key={trail.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{trail.name}</p>
                    <p className="text-sm text-gray-500">
                      {trail.distance_miles} mi • {trail.elevation_gain_ft} ft gain
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {trail.activity_types.map((activity) => (
                      <span
                        key={activity}
                        className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {trail.difficulty && (
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      difficultyStyles[trail.difficulty]
                    )}>
                      {trail.difficulty}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium',
                      statusStyles[trail.status]
                    )}
                  >
                    {trail.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/trails/${trail.slug}`}
                      className="px-3 py-1 text-sm text-evta-green-600 hover:bg-evta-green-50 rounded font-medium"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/trails/${trail.slug}`}
                      target="_blank"
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded font-medium"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
