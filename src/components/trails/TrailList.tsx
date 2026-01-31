'use client'

import { useState, useMemo } from 'react'
import { Trail, TrailFilters as FilterType } from '@/types'
import { TrailCard } from './TrailCard'
import { TrailFilters } from './TrailFilters'

interface TrailListProps {
  trails: Trail[]
}

export function TrailList({ trails }: TrailListProps) {
  const [filters, setFilters] = useState<FilterType>({})

  const filteredTrails = useMemo(() => {
    return trails.filter((trail) => {
      // Filter by activity type
      if (filters.activity && !trail.activity_types.includes(filters.activity)) {
        return false
      }

      // Filter by difficulty
      if (filters.difficulty && trail.difficulty !== filters.difficulty) {
        return false
      }

      // Filter by features (must have ALL selected features)
      if (filters.features && filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feature) =>
          trail.features.includes(feature)
        )
        if (!hasAllFeatures) {
          return false
        }
      }

      // Filter by status (if specified)
      if (filters.status && trail.status !== filters.status) {
        return false
      }

      return true
    })
  }, [trails, filters])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <TrailFilters
        filters={filters}
        onFilterChange={setFilters}
        resultCount={filteredTrails.length}
        totalCount={trails.length}
      />

      {/* Results */}
      {filteredTrails.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 mb-4">No trails match your filters</p>
          <button
            onClick={() => setFilters({})}
            className="text-evta-green-600 hover:text-evta-green-700 font-medium"
          >
            Clear filters to see all trails
          </button>
        </div>
      )}
    </div>
  )
}
