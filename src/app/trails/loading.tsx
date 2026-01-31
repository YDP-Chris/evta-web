import { TrailListSkeleton } from '@/components/ui/LoadingSpinner'

export default function TrailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header Skeleton */}
      <div className="bg-evta-green-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 bg-evta-green-700 rounded w-48 mb-2" />
          <div className="h-6 bg-evta-green-700 rounded w-64" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 animate-pulse">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 rounded w-24" />
              <div className="h-10 bg-gray-200 rounded w-24" />
              <div className="h-10 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>

        <TrailListSkeleton />
      </div>
    </div>
  )
}
