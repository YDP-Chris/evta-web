'use client'

import { ActivityType, Difficulty, TrailFeature, TrailFilters as FilterType } from '@/types'
import { cn } from '@/lib/utils/cn'

interface TrailFiltersProps {
  filters: FilterType
  onFilterChange: (filters: FilterType) => void
  resultCount: number
  totalCount: number
}

const activities: { value: ActivityType; label: string }[] = [
  { value: 'Hike', label: 'Hiking' },
  { value: 'Bike', label: 'Biking' },
  { value: 'Paddle', label: 'Paddling' },
  { value: 'Equestrian', label: 'Equestrian' },
]

const difficulties: { value: Difficulty; label: string; style: string }[] = [
  { value: 'Easy', label: 'Easy', style: 'border-evta-green-300 bg-evta-green-50 text-evta-green-700' },
  { value: 'Moderate', label: 'Moderate', style: 'border-amber-300 bg-amber-50 text-amber-700' },
  { value: 'Difficult', label: 'Difficult', style: 'border-red-300 bg-red-50 text-red-700' },
]

const features: { value: TrailFeature; label: string }[] = [
  { value: 'Dog-friendly', label: 'Dog-friendly' },
  { value: 'Kid-friendly', label: 'Kid-friendly' },
  { value: 'Accessible', label: 'Accessible' },
  { value: 'Waterfall', label: 'Waterfall' },
  { value: 'Vineyard', label: 'Vineyard' },
  { value: 'River Access', label: 'River Access' },
  { value: 'Scenic Views', label: 'Scenic Views' },
  { value: 'Restrooms', label: 'Restrooms' },
]

export function TrailFilters({
  filters,
  onFilterChange,
  resultCount,
  totalCount,
}: TrailFiltersProps) {
  const handleActivityChange = (activity: ActivityType) => {
    onFilterChange({
      ...filters,
      activity: filters.activity === activity ? undefined : activity,
    })
  }

  const handleDifficultyChange = (difficulty: Difficulty) => {
    onFilterChange({
      ...filters,
      difficulty: filters.difficulty === difficulty ? undefined : difficulty,
    })
  }

  const handleFeatureChange = (feature: TrailFeature) => {
    const currentFeatures = filters.features || []
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature]

    onFilterChange({
      ...filters,
      features: newFeatures.length > 0 ? newFeatures : undefined,
    })
  }

  const clearFilters = () => {
    onFilterChange({})
  }

  const hasActiveFilters = filters.activity || filters.difficulty || (filters.features && filters.features.length > 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      {/* Activity Type Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Activity</h3>
        <div className="flex flex-wrap gap-2">
          {activities.map((activity) => (
            <button
              key={activity.value}
              onClick={() => handleActivityChange(activity.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filters.activity === activity.value
                  ? 'bg-evta-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {activity.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => handleDifficultyChange(difficulty.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium border transition-colors',
                filters.difficulty === difficulty.value
                  ? 'bg-evta-green-600 text-white border-evta-green-600'
                  : difficulty.style
              )}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>

      {/* Features Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <button
              key={feature.value}
              onClick={() => handleFeatureChange(feature.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                filters.features?.includes(feature.value)
                  ? 'bg-evta-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count and Clear */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{resultCount}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> trails
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-evta-green-600 hover:text-evta-green-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}
