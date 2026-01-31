'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ActivityType, CheckInFormData } from '@/types'
import { mockTrails } from '@/lib/data/mock-trails'
import { cn } from '@/lib/utils/cn'

const activities: { value: ActivityType; label: string; icon: string }[] = [
  { value: 'Hike', label: 'Hiking', icon: '🥾' },
  { value: 'Bike', label: 'Biking', icon: '🚴' },
  { value: 'Paddle', label: 'Paddling', icon: '🛶' },
  { value: 'Equestrian', label: 'Equestrian', icon: '🐴' },
]

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function CheckInPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  // TODO: Fetch trail from Supabase
  const trail = mockTrails.find((t) => t.slug === slug)

  const [formData, setFormData] = useState<CheckInFormData>({
    party_size: 1,
    activity_type: 'Hike',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [todayCount, setTodayCount] = useState(0)

  if (!trail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trail Not Found</h1>
          <p className="text-gray-600 mb-4">We couldn&apos;t find this trail.</p>
          <Link href="/trails" className="text-evta-green-600 hover:underline">
            Browse all trails →
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Submit to Supabase
      // const { data, error } = await supabase
      //   .from('check_ins')
      //   .insert({
      //     trail_id: trail.id,
      //     party_size: formData.party_size,
      //     activity_type: formData.activity_type,
      //   })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock today's count
      setTodayCount(Math.floor(Math.random() * 20) + 5)
      setIsComplete(true)
    } catch (error) {
      console.error('Check-in failed:', error)
      alert('Check-in failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-evta-green-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thanks for checking in!
          </h1>
          <p className="text-gray-600 mb-6">
            Your check-in helps us track trail usage for grants and improvements.
          </p>

          <div className="bg-evta-green-50 rounded-lg p-4 mb-6">
            <p className="text-evta-green-800">
              <span className="font-bold text-2xl">{todayCount}</span>
              <br />
              <span className="text-sm">other visitors on {trail.name} today</span>
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href={`/trails/${trail.slug}`}
              className="flex items-center justify-center w-full px-4 py-3 bg-evta-green-600 text-white font-semibold rounded-lg hover:bg-evta-green-700 transition-colors touch-target"
            >
              View Trail Details
            </Link>
            <Link
              href="/trails"
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors touch-target"
            >
              Find Another Trail
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Have a great adventure! 🌲
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-evta-green-800">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <div className="text-4xl mb-2">🌲</div>
          <h1 className="text-2xl font-bold mb-1">Check In</h1>
          <p className="text-evta-green-200">{trail.name}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Party Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How many in your group?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {partySizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, party_size: size })}
                    className={cn(
                      'py-3 rounded-lg font-semibold text-lg transition-colors touch-target',
                      formData.party_size === size
                        ? 'bg-evta-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What are you doing today?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {activities
                  .filter((a) => trail.activity_types.includes(a.value))
                  .map((activity) => (
                    <button
                      key={activity.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, activity_type: activity.value })
                      }
                      className={cn(
                        'flex flex-col items-center justify-center p-4 rounded-lg transition-colors touch-target',
                        formData.activity_type === activity.value
                          ? 'bg-evta-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      <span className="text-3xl mb-1">{activity.icon}</span>
                      <span className="font-medium">{activity.label}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full py-4 rounded-lg font-semibold text-lg transition-colors touch-target',
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-evta-green-600 text-white hover:bg-evta-green-700'
              )}
            >
              {isSubmitting ? 'Checking in...' : 'Check In'}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-500">
            Your check-in is anonymous and helps EVTA secure grants for trail maintenance.
          </p>
        </div>
      </div>
    </div>
  )
}
