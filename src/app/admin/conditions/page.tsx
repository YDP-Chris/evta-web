'use client'

import { useState } from 'react'
import { mockTrails } from '@/lib/data/mock-trails'
import { Trail, TrailStatus } from '@/types'
import { cn } from '@/lib/utils/cn'

const statusOptions: { value: TrailStatus; label: string; color: string; description: string }[] = [
  { value: 'Open', label: 'Open', color: 'bg-evta-green-100 text-evta-green-700 border-evta-green-300', description: 'Trail is open and in good condition' },
  { value: 'Caution', label: 'Caution', color: 'bg-amber-100 text-amber-700 border-amber-300', description: 'Trail is passable with some hazards' },
  { value: 'Closed', label: 'Closed', color: 'bg-gray-100 text-gray-600 border-gray-300', description: 'Trail is closed to all users' },
]

export default function AdminConditionsPage() {
  const [trails, setTrails] = useState<Trail[]>(mockTrails)
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null)
  const [newStatus, setNewStatus] = useState<TrailStatus>('Open')
  const [statusNote, setStatusNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateStatus = async () => {
    if (!selectedTrail) return

    setIsSubmitting(true)

    try {
      // TODO: Submit to Supabase
      // const supabase = createClient()
      // await supabase.from('trail_conditions').insert({
      //   trail_id: selectedTrail.id,
      //   status: newStatus,
      //   note: statusNote || null,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setTrails(trails.map((t) =>
        t.id === selectedTrail.id
          ? { ...t, status: newStatus, status_note: statusNote || null }
          : t
      ))

      // Reset form
      setSelectedTrail(null)
      setNewStatus('Open')
      setStatusNote('')

      alert('Trail status updated!')
    } catch (error) {
      alert('Failed to update status')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Trail Conditions</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trail List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Trail</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {trails.map((trail) => (
              <button
                key={trail.id}
                onClick={() => {
                  setSelectedTrail(trail)
                  setNewStatus(trail.status)
                  setStatusNote(trail.status_note || '')
                }}
                className={cn(
                  'w-full flex items-center justify-between p-4 rounded-lg border transition-colors text-left',
                  selectedTrail?.id === trail.id
                    ? 'border-evta-green-500 bg-evta-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                )}
              >
                <div>
                  <p className="font-medium text-gray-900">{trail.name}</p>
                  {trail.status_note && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{trail.status_note}</p>
                  )}
                </div>
                <span
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    statusOptions.find((s) => s.value === trail.status)?.color
                  )}
                >
                  {trail.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>

          {selectedTrail ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Selected Trail</p>
                <p className="text-lg font-medium text-gray-900">{selectedTrail.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  New Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setNewStatus(option.value)}
                      className={cn(
                        'flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors',
                        newStatus === option.value
                          ? 'border-evta-green-500 bg-evta-green-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      )}
                    >
                      <span className={cn(
                        'px-3 py-1 rounded-full text-sm font-semibold mb-2',
                        option.color
                      )}>
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 text-center">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                  Status Note (optional)
                </label>
                <textarea
                  id="note"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g., Flooding at creek crossing after recent rain"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-evta-green-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUpdateStatus}
                  disabled={isSubmitting}
                  className={cn(
                    'flex-1 py-3 rounded-lg font-semibold transition-colors',
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-evta-green-600 text-white hover:bg-evta-green-700'
                  )}
                >
                  {isSubmitting ? 'Updating...' : 'Update Status'}
                </button>
                <button
                  onClick={() => {
                    setSelectedTrail(null)
                    setNewStatus('Open')
                    setStatusNote('')
                  }}
                  className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p>Select a trail from the list to update its status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
