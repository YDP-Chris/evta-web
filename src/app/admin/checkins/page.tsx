'use client'

import { useState } from 'react'
import { mockTrails } from '@/lib/data/mock-trails'

// Mock check-in data for development
const mockCheckIns = [
  { id: '1', trail_name: 'Grassy Creek Trail', party_size: 3, activity_type: 'Hike', checked_in_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: '2', trail_name: 'Carter Falls Trail', party_size: 2, activity_type: 'Hike', checked_in_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
  { id: '3', trail_name: 'Elkin Mountain Bike Park', party_size: 1, activity_type: 'Bike', checked_in_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
  { id: '4', trail_name: 'Grassy Creek Trail', party_size: 4, activity_type: 'Hike', checked_in_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', trail_name: 'Yadkin River Paddle Trail', party_size: 2, activity_type: 'Paddle', checked_in_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
]

type DateRange = '7d' | '30d' | '90d' | 'all'

export default function AdminCheckInsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const [selectedTrail, setSelectedTrail] = useState<string>('all')

  // Filter check-ins based on selection
  const filteredCheckIns = mockCheckIns.filter((checkin) => {
    if (selectedTrail !== 'all' && checkin.trail_name !== selectedTrail) {
      return false
    }
    // TODO: Add date filtering
    return true
  })

  // Calculate stats
  const totalCheckIns = filteredCheckIns.length
  const totalVisitors = filteredCheckIns.reduce((sum, c) => sum + c.party_size, 0)
  const avgPartySize = totalCheckIns > 0 ? (totalVisitors / totalCheckIns).toFixed(1) : '0'

  // Activity breakdown
  const activityBreakdown = filteredCheckIns.reduce((acc, c) => {
    acc[c.activity_type] = (acc[c.activity_type] || 0) + c.party_size
    return acc
  }, {} as Record<string, number>)

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'Trail', 'Party Size', 'Activity']
    const rows = filteredCheckIns.map((c) => [
      new Date(c.checked_in_at).toLocaleString(),
      c.trail_name,
      c.party_size.toString(),
      c.activity_type,
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `evta-checkins-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Check-in Statistics</h1>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-evta-green-600 text-white font-medium rounded-lg hover:bg-evta-green-700 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-evta-green-500 focus:border-transparent outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trail</label>
            <select
              value={selectedTrail}
              onChange={(e) => setSelectedTrail(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-evta-green-500 focus:border-transparent outline-none"
            >
              <option value="all">All Trails</option>
              {mockTrails.map((trail) => (
                <option key={trail.id} value={trail.name}>
                  {trail.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Total Check-ins</p>
          <p className="text-3xl font-bold text-gray-900">{totalCheckIns}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Total Visitors</p>
          <p className="text-3xl font-bold text-gray-900">{totalVisitors}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Avg Party Size</p>
          <p className="text-3xl font-bold text-gray-900">{avgPartySize}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">By Activity</p>
          <div className="mt-2 space-y-1 text-sm">
            {Object.entries(activityBreakdown).map(([activity, count]) => (
              <div key={activity} className="flex justify-between">
                <span className="text-gray-600">{activity}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Check-ins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Check-ins</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Date/Time</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Trail</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Party Size</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCheckIns.map((checkin) => (
              <tr key={checkin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(checkin.checked_in_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{checkin.trail_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{checkin.party_size}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{checkin.activity_type}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCheckIns.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No check-ins found for the selected filters.
          </div>
        )}
      </div>

      {/* Grant Report Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-1">Grant Reporting</h3>
        <p className="text-sm text-blue-700">
          Use the Export CSV button to download check-in data for grant applications.
          The report includes: total check-ins by trail, visitors by activity type,
          average party size, and peak usage times.
        </p>
      </div>
    </div>
  )
}
