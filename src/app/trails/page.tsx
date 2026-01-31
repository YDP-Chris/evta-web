import { Metadata } from 'next'
import { TrailList } from '@/components/trails/TrailList'
import { mockTrails } from '@/lib/data/mock-trails'

export const metadata: Metadata = {
  title: 'Find a Trail',
  description: 'Discover hiking, biking, paddling, and equestrian trails in the Elkin Valley. Filter by activity, difficulty, and features.',
}

// TODO: Replace with Supabase query when database is connected
async function getTrails() {
  // In production, this would fetch from Supabase:
  // const supabase = await createClient()
  // const { data } = await supabase.from('trails').select('*').order('name')
  // return data || []

  return mockTrails
}

export default async function TrailsPage() {
  const trails = await getTrails()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-evta-green-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find a Trail</h1>
          <p className="text-evta-green-100 text-lg">
            Explore {trails.length}+ trails in the Elkin Valley
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <TrailList trails={trails} />
      </div>
    </div>
  )
}
